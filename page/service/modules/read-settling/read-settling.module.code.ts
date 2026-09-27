import { existsSync } from "node:fs"
import { join } from "node:path"
import { abandoned, LOCK_AT } from "akasha/git/modules/holding/holding.module.code.ts"

const LANDING = 0

const WAITED = 5

const LOOKED_MS = 50

const WAITED_AT_MOST = 60_000

export type Settled<T> = { readonly settled: T } | { readonly refused: string }

export function apartFor(readers: number): Int32Array {
  return new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * (1 + readers)))
}

function landingHeld(root: string): boolean {
  const at = join(root, LOCK_AT)
  return existsSync(at) && !abandoned(at)
}

async function unheld(root: string, until: number): Promise<boolean> {
  while (landingHeld(root)) {
    if (Date.now() > until) return false
    await Bun.sleep(WAITED)
  }
  return true
}

export function unheldSaid(waited: number): string {
  return `a landing has held the checkout for longer than ${Math.round(waited / 1000)}s, so no answer is given rather than one read partway through that landing`
}

function entered(apart: Int32Array, at: number): undefined {
  for (;;) {
    while (Atomics.load(apart, LANDING) !== 0) Atomics.wait(apart, LANDING, 1, LOOKED_MS)
    Atomics.store(apart, 1 + at, 1)
    if (Atomics.load(apart, LANDING) === 0) return undefined
    Atomics.store(apart, 1 + at, 0)
  }
}

export function left(apart: Int32Array, at: number): undefined {
  Atomics.store(apart, 1 + at, 0)
  return undefined
}

export async function settledApart<T>(
  root: string,
  apart: Int32Array,
  at: number,
  act: () => T,
  waited: number = WAITED_AT_MOST
): Promise<Settled<T>> {
  if (!(await unheld(root, Date.now() + waited))) return { refused: unheldSaid(waited) }
  entered(apart, at)
  try {
    return { settled: act() }
  } finally {
    left(apart, at)
  }
}

function reading(apart: Int32Array): boolean {
  for (let at = 1; at < apart.length; at += 1) if (Atomics.load(apart, at) !== 0) return true
  return false
}

export function unwaitedSaid(waited: number): string {
  return `the reading threads were still answering after ${Math.round(waited / 1000)}s, so this landing went ahead of them\n`
}

export async function landedApart<T>(
  apart: Int32Array,
  act: () => Promise<T>,
  waited: number = WAITED_AT_MOST
): Promise<T> {
  Atomics.store(apart, LANDING, 1)
  try {
    const until = Date.now() + waited
    while (reading(apart)) {
      if (Date.now() > until) {
        process.stderr.write(unwaitedSaid(waited))
        break
      }
      await Bun.sleep(WAITED)
    }
    return await act()
  } finally {
    Atomics.store(apart, LANDING, 0)
    Atomics.notify(apart, LANDING)
  }
}
