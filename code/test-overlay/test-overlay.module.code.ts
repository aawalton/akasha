import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, isAbsolute, join, normalize } from "node:path"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

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

export function linked(body: Body): body is Link {
  return body !== null && typeof body !== "string" && !(body instanceof Uint8Array)
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

export function sweptAt(held: string): undefined {
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
      if (linked(body)) symlinkSync(body.linkedTo, at)
      else writeFileSync(at, body)
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
