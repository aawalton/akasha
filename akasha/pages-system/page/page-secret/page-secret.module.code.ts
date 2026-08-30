import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { dataIn } from "../../../file-system/data-place/data-place.module.code.ts"
import { secretAt } from "../page-file-name/page-file-name.module.code.ts"

export type Secrets = ReadonlyMap<string, string>

export type Composed = {
  readonly text: string | null
  readonly why: string
}

const SOPS = "sops"

const CONFIG = ".sops.yaml"

const SCRATCH = "sops"

const HELD = "yaml"

const CEILING = 10_000

const KEYED = /^([A-Za-z0-9_-]+): ENC\[/gm

const SAYS_SOPS = /^sops:$/m

const SAYS_MAC = /^\s+mac: ENC\[/m

export function keysHeldIn(ciphertext: string): readonly string[] {
  return [...ciphertext.matchAll(KEYED)].map((one) => one[1] as string).sort()
}

export function looksEncrypted(text: string): boolean {
  return SAYS_SOPS.test(text) && SAYS_MAC.test(text)
}

export function yamlOf(values: Secrets): string {
  return [...values.keys()]
    .sort()
    .map((key) => `${key}: ${JSON.stringify(values.get(key) as string)}\n`)
    .join("")
}

export function unfit(key: string, value: string): string | null {
  if (value === "")
    return `\`${key}\` arrived empty, and an empty secret would stand for a usable one`
  if (value.includes("\n")) return `\`${key}\` holds a newline, and a secret's value is one line`
  return null
}

function besideOr(page: string): string {
  const at = secretAt(page)
  if (at === null) {
    throw new Error(`'${page}' is no TypeScript file, so nothing stands beside it to hold secrets`)
  }
  return at
}

function ran(root: string, args: readonly string[], doing: string): Composed {
  let done: { exitCode: number | null; stdout: Buffer; stderr: Buffer }
  try {
    done = Bun.spawnSync([SOPS, ...args], {
      cwd: root,
      stdout: "pipe",
      stderr: "pipe",
      timeout: CEILING,
    })
  } catch (thrown) {
    return { text: null, why: `${doing} could not run: ${String(thrown)}` }
  }
  if (done.exitCode === null) {
    return { text: null, why: `${doing} was killed after ${CEILING / 1000}s and said nothing` }
  }
  if (done.exitCode !== 0) {
    return { text: null, why: `${doing} failed: ${done.stderr.toString().trim()}` }
  }
  return { text: done.stdout.toString(), why: "" }
}

function scratchFor(root: string, body: string): string {
  const at = dataIn(root, SCRATCH, `${process.pid}.${HELD}`)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body, "utf8")
  return at
}

export function cipherFor(root: string, page: string, values: Secrets): Composed {
  const sidecar = besideOr(page)
  if (values.size === 0) {
    return { text: null, why: `a sops file holding nothing is taken away rather than written` }
  }
  for (const [key, value] of values) {
    const wrong = unfit(key, value)
    if (wrong !== null) return { text: null, why: wrong }
  }
  const at = scratchFor(root, yamlOf(values))
  try {
    const said = ran(
      root,
      [
        "--config",
        join(root, CONFIG),
        "encrypt",
        "--filename-override",
        sidecar,
        "--input-type",
        HELD,
        "--output-type",
        HELD,
        at,
      ],
      `encrypting ${sidecar}`
    )
    if (said.text === null) return said
    if (!looksEncrypted(said.text)) {
      return { text: null, why: `what was composed for ${sidecar} carries no sops mac` }
    }
    return said
  } finally {
    rmSync(at, { force: true })
  }
}

function valuesFrom(said: string, sidecar: string): Secrets {
  let held: unknown
  try {
    held = JSON.parse(said)
  } catch (thrown) {
    throw new Error(
      `'${sidecar}' decrypted to no json, so what it holds is unknown: ${String(thrown)}`
    )
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    throw new Error(`'${sidecar}' decrypted to no set of keys, so what it holds is unknown`)
  }
  const found = new Map<string, string>()
  for (const [key, value] of Object.entries(held as Record<string, unknown>)) {
    if (typeof value !== "string") {
      throw new Error(`'${sidecar}' holds \`${key}\` as something other than text`)
    }
    found.set(key, value)
  }
  return found
}

export function secretsIn(root: string, page: string): Secrets | null {
  const sidecar = secretAt(page)
  if (sidecar === null) return null
  const full = join(root, sidecar)
  if (!existsSync(full)) return null
  const said = ran(
    root,
    ["decrypt", "--input-type", HELD, "--output-type", "json", full],
    `decrypting ${sidecar}`
  )
  if (said.text === null) {
    throw new Error(
      `'${sidecar}' stands beside a page and could not be decrypted, so what it holds is unknown rather than nothing: ${said.why}`
    )
  }
  return valuesFrom(said.text, sidecar)
}

export function keysBeside(root: string, page: string): readonly string[] {
  const sidecar = secretAt(page)
  if (sidecar === null) return []
  const full = join(root, sidecar)
  if (!existsSync(full)) return []
  return keysHeldIn(readFileSync(full, "utf8"))
}
