import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  NO_CODE,
  ran as running,
  type Said,
} from "akasha/code/spawning/modules/running/running.module.code.ts"
import { secretAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { z } from "zod"

export type Secrets = ReadonlyMap<string, string>

export type Composed = {
  readonly text: string | null
  readonly why: string
}

const SOPS = "sops"

const CONFIG = ".sops.yaml"

const HELD = "yaml"

const STDIN = "/dev/stdin"

const BYTES = new TextEncoder()

const NOTHING_IN = new Uint8Array()

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
    return `\`${key}\` arrived empty, and an empty secret would represent a usable one`
  return null
}

function besideOr(page: string): string {
  const at = secretAt(page)
  if (at === null) {
    throw new Error(`'${page}' is no TypeScript file, so nothing sits beside it to hold secrets`)
  }
  return at
}

function ran(
  root: string,
  args: readonly string[],
  doing: string,
  stdin: Uint8Array = NOTHING_IN
): Composed {
  let done: Said
  try {
    done = running([SOPS, ...args], { cwd: root, timeout: CEILING, stdin })
  } catch (thrown) {
    return { text: null, why: `${doing} could not run: ${String(thrown)}` }
  }
  if (done.code === NO_CODE) {
    return { text: null, why: `${doing} was killed after ${CEILING / 1000}s and said nothing` }
  }
  if (done.code !== 0) {
    return { text: null, why: `${doing} failed: ${done.err.trim()}` }
  }
  return { text: done.out, why: "" }
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
      STDIN,
    ],
    `encrypting ${sidecar}`,
    BYTES.encode(yamlOf(values))
  )
  if (said.text === null) return said
  if (!looksEncrypted(said.text)) {
    return { text: null, why: `what was composed for ${sidecar} carries no sops mac` }
  }
  return said
}

const SECRETS_SAID = z.record(z.string(), z.string())

function valuesFrom(said: string, sidecar: string): Secrets {
  let held: ReturnType<typeof SECRETS_SAID.safeParse>
  try {
    held = SECRETS_SAID.safeParse(JSON.parse(said))
  } catch (thrown) {
    throw new Error(
      `'${sidecar}' decrypted to no json, so what it holds is unknown: ${String(thrown)}`
    )
  }
  if (!held.success) {
    const key = held.error.issues[0]?.path[0]
    if (typeof key === "string") {
      throw new Error(`'${sidecar}' holds \`${key}\` as something other than text`)
    }
    throw new Error(`'${sidecar}' decrypted to no set of keys, so what it holds is unknown`)
  }
  return new Map(Object.entries(held.data))
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
      `'${sidecar}' sits beside a page and could not be decrypted, so what it holds is unknown rather than nothing: ${said.why}`
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
