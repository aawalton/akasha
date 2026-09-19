import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { homedir } from "node:os"
import { dirname, isAbsolute, join, normalize } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

export const HOLD = "/var/tmp"

const PREFIX = "akasha-overlay-"

const UPPER = "upper"

const WORK = "work"

const MERGED = "merged"

const HOMED = "home"

export const MOUNTED = "AKASHA_MERGED"

const MOUNTING = "mount.sh"

const TAKEN = "taken.txt"

const OWN = ["unshare", "-Urm", "--propagation", "private"]

const MODE = 0o755

const CARRIED = 0o777

const OUTSIDE = "reaches outside the checkout, and a mount carries the checkout's own paths alone"

const SHIM =
  "#!/bin/sh\n" +
  "mount -t overlay overlay" +
  " -o lowerdir=$AKASHA_LOWER,upperdir=$AKASHA_UPPER,workdir=$AKASHA_WORK" +
  " $AKASHA_MERGED || exit 97\n" +
  "cd $AKASHA_MERGED || exit 98\n" +
  'while IFS= read -r one; do [ -n "$one" ] && rm -rf "./$one"; done < "$AKASHA_TAKEN"\n' +
  'exec "$@"\n'

export type Link = { readonly linkedTo: string }

export type Body = Uint8Array | string | Link | null

export type Bodies = Readonly<Record<string, Body>>

function linked(body: Body): body is Link {
  return body !== null && typeof body !== "string" && !(body instanceof Uint8Array)
}

export type Absent = {
  readonly path: string
  readonly why: string
}

const REMOVED = "the overlay carried a removal for it"

const UNCARRIED = "the overlay carried no body for it, and the checkout under the overlay has none"

export function absentFrom(
  root: string,
  named: readonly string[],
  bodies: Bodies
): readonly Absent[] {
  const found: Absent[] = []
  for (const one of named) {
    const body = bodies[one]
    if (body === null) found.push({ path: one, why: REMOVED })
    else if (body === undefined && !existsSync(join(root, one))) {
      found.push({ path: one, why: UNCARRIED })
    }
  }
  return found
}

const RENAMING =
  "A filter naming no file is answered `had no matches`, which reads as a file misnamed. The name is right and the tree was short, so renaming the file mends nothing. `akasha change list` names the edits kept, and `akasha change show` answers the body a path would have once they land."

export function absentlyOf(each: readonly Absent[]): string {
  const held = each.map((one) => `${one.path} — ${one.why}`).join("\n")
  const was = each.length === 1 ? "was" : "were"
  return (
    `${counted(each.length, "test file")} the run named ${was} nowhere in the tree the tests ` +
    `ran over:\n${held}\n\n${RENAMING}\n\n`
  )
}

export type Overlay = {
  readonly merged: string
  readonly env: Readonly<Record<string, string>>
  readonly under: (argv: readonly string[]) => readonly string[]
  readonly sweep: () => undefined
}

export function insideOf(one: string): boolean {
  const held = normalize(one)
  return !isAbsolute(held) && !held.startsWith("..")
}

const AGE_KEY = "SOPS_AGE_KEY_FILE"

const AGE_KEY_AT = [".config", "sops", "age", "keys.txt"]

function ageKeyNamed(): Readonly<Record<string, string>> {
  const said = optionalEnv(AGE_KEY)
  if (said !== undefined) return { [AGE_KEY]: said }
  const at = join(homedir(), ...AGE_KEY_AT)
  return existsSync(at) ? { [AGE_KEY]: at } : {}
}

function modeUnder(root: string, one: string): number | null {
  const found = statSync(join(root, one), { throwIfNoEntry: false })
  if (found === undefined || !found.isFile()) return null
  return found.mode & CARRIED
}

function sweptAt(held: string): undefined {
  ran([...OWN, "rm", "-rf", held])
  rmSync(held, { recursive: true, force: true })
}

export function mountedOver(root: string, bodies: Bodies): Overlay {
  for (const one of Object.keys(bodies)) {
    if (!insideOf(one)) throw new Error(`\`${one}\` ${OUTSIDE}`)
  }
  const held = mkdtempSync(join(HOLD, PREFIX))
  try {
    const upper = join(held, UPPER)
    const work = join(held, WORK)
    const merged = join(held, MERGED)
    const homed = join(held, HOMED)
    for (const one of [upper, work, merged, homed]) mkdirSync(one)
    const taken: string[] = []
    for (const [one, body] of Object.entries(bodies)) {
      if (body === null) {
        taken.push(one)
        continue
      }
      const at = join(upper, one)
      mkdirSync(dirname(at), { recursive: true })
      if (linked(body)) {
        symlinkSync(body.linkedTo, at)
        continue
      }
      const mode = modeUnder(root, one)
      writeFileSync(at, body)
      if (mode !== null) chmodSync(at, mode)
    }
    const listed = join(held, TAKEN)
    writeFileSync(listed, taken.map((one) => `${one}\n`).join(""))
    const shim = join(held, MOUNTING)
    writeFileSync(shim, SHIM, { mode: MODE })
    return {
      merged,
      env: {
        AKASHA_LOWER: root,
        AKASHA_UPPER: upper,
        AKASHA_WORK: work,
        [MOUNTED]: merged,
        AKASHA_TAKEN: listed,
        ...ageKeyNamed(),
        HOME: homed,
      },
      under: (argv: readonly string[]): readonly string[] => [...OWN, shim, ...argv],
      sweep: (): undefined => {
        sweptAt(held)
      },
    }
  } catch (thrown) {
    sweptAt(held)
    throw thrown
  }
}
