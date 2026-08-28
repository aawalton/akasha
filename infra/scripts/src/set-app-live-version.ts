#!/usr/bin/env bun

import { patchState } from "@shared/pages-query"
import { askPage } from "@shared/pages-query/ask"

const WEB_APP_PAGE_TYPE = "web-app"

const WRITER = "set-app-live-version"

function fail(msg: string): never {
  console.error(`[${WRITER}] ${msg}`)
  process.exit(1)
}

function argValue(flag: string): string | undefined {
  const i = process.argv.indexOf(flag)
  if (i === -1) return undefined
  return process.argv[i + 1]
}

const app = argValue("--app")
const version = argValue("--version")
if (app == null) fail("--app <web-app-slug> is required")
if (version == null) fail("--version <hash> is required")

const stands = await askPage(WEB_APP_PAGE_TYPE, app)
// A READ THAT NEVER LANDED SAYS NOTHING ABOUT THE SLUG. Reported as an absence it sends whoever ran
// this off to correct an argument that was right.
if (stands.outcome === "unasked") {
  fail(`whether a web app page is named "${app}" went unread: ${stands.why}`)
}
if (stands.outcome === "absent") {
  fail(
    `no web app page is named "${app}" — the live version hangs off the web app the deploy published, so \`--app\` takes that web app's slug: ${stands.why}`
  )
}

const written = await patchState(
  WEB_APP_PAGE_TYPE,
  app,
  { "live-version": version, "deployed-at": new Date().toISOString() },
  WRITER
)
if (!written.ok) fail(written.why)

console.log(`[${WRITER}] ${app} → ${version} at ${written.at}`)
