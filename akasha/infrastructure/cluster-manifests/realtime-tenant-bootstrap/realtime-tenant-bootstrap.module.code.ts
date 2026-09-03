#!/usr/bin/env bun

import { createHmac } from "node:crypto"
import { z } from "zod"

const REALTIME_URL = z
  .string()
  .default("http://realtime.supabase-realtime.svc.cluster.local:4000")
  .parse(process.env.REALTIME_URL)
const GOTRUE_JWKS_URL = z
  .string()
  .default("https://supabase.alanwalton.com/auth/v1/.well-known/jwks.json")
  .parse(process.env.GOTRUE_JWKS_URL)
const TENANT_EXTERNAL_ID = z.string().default("realtime").parse(process.env.REALTIME_TENANT)
const REALTIME_NAMESPACE = z
  .string()
  .default("supabase-realtime")
  .parse(process.env.REALTIME_NAMESPACE)
const REALTIME_SECRET_NAME = z
  .string()
  .default("realtime-secrets")
  .parse(process.env.REALTIME_SECRET_NAME)

function readKubeSecret(namespace: string, secretName: string, key: string): string {
  const proc = Bun.spawnSync({
    cmd: ["kubectl", "get", "secret", "-n", namespace, secretName, "-o", `jsonpath={.data.${key}}`],
    stdout: "pipe",
    stderr: "pipe",
  })
  if (proc.exitCode !== 0) {
    const stderr = proc.stderr ? new TextDecoder().decode(proc.stderr).trim() : ""
    console.error(
      `kubectl get secret ${secretName} (key=${key}) in namespace ${namespace} failed (exit ${proc.exitCode}): ${stderr}`
    )
    process.exit(1)
  }
  const encoded = new TextDecoder().decode(proc.stdout).trim()
  if (encoded === "") {
    console.error(
      `${key} not present in secret ${secretName}/${key} — has the secret been applied?`
    )
    process.exit(1)
  }
  const decoded = Buffer.from(encoded, "base64").toString("utf8")
  if (decoded === "") {
    console.error(
      `${key} not present in secret ${secretName}/${key} — has the secret been applied?`
    )
    process.exit(1)
  }
  return decoded
}

const apiJwtSecret = readKubeSecret(REALTIME_NAMESPACE, REALTIME_SECRET_NAME, "API_JWT_SECRET")
const databaseUrl = readKubeSecret(REALTIME_NAMESPACE, REALTIME_SECRET_NAME, "DATABASE_URL")
const dbUrl = new URL(databaseUrl)
const dbHost = dbUrl.hostname
const dbPort = dbUrl.port !== "" ? dbUrl.port : "5432"
const dbName = (() => {
  const stripped = dbUrl.pathname.replace(/^\//, "")
  return stripped !== "" ? stripped : "postgres"
})()
const dbUser = decodeURIComponent(dbUrl.username)
const dbPassword = decodeURIComponent(dbUrl.password)

function base64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function signJwtHs256(payload: Record<string, unknown>, secret: string): string {
  const header = { alg: "HS256", typ: "JWT" }
  const encHeader = base64url(JSON.stringify(header))
  const encPayload = base64url(JSON.stringify(payload))
  const signingInput = `${encHeader}.${encPayload}`
  const sig = createHmac("sha256", secret).update(signingInput).digest()
  return `${signingInput}.${base64url(sig)}`
}

const now = Math.floor(Date.now() / 1000)
const mgmtToken = signJwtHs256(
  { iss: "realtime-bootstrap", iat: now, exp: now + 300 },
  apiJwtSecret
)

const jwksRes = await fetch(GOTRUE_JWKS_URL)
if (!jwksRes.ok) {
  console.error(`Failed to fetch JWKS from ${GOTRUE_JWKS_URL}: ${jwksRes.status}`)
  process.exit(1)
}
const jwks = await jwksRes.json()

const body = {
  name: TENANT_EXTERNAL_ID,
  external_id: TENANT_EXTERNAL_ID,
  max_concurrent_users: 500,
  jwt_jwks: jwks,
  extensions: [
    {
      type: "postgres_cdc_rls",
      settings: {
        db_host: dbHost,
        db_port: dbPort,
        db_name: dbName,
        db_user: dbUser,
        db_password: dbPassword,
        ssl_enforced: false,
        region: "self-hosted",
        publication: "supabase_realtime",
        poll_interval_ms: 1000,
        poll_max_changes: 100,
        poll_max_record_bytes: 1048576,
        slot_name: "supabase_realtime_replication_slot",
      },
    },
  ],
}

const res = await fetch(`${REALTIME_URL}/api/tenants/${TENANT_EXTERNAL_ID}`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${mgmtToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ tenant: body }),
})

const text = await res.text()
console.log(`${res.status} ${res.statusText}`)
console.log(text)
process.exit(res.ok ? 0 : 1)
