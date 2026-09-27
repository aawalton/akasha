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

async function readsLeft(apart: Int32Array, waited: number): Promise<undefined> {
  Atomics.store(apart, LANDING, 1)
  const until = Date.now() + waited
  while (reading(apart)) {
    if (Date.now() > until) {
      process.stderr.write(unwaitedSaid(waited))
      break
    }
    await Bun.sleep(WAITED)
  }
  return undefined
}

function reopened(apart: Int32Array): undefined {
  Atomics.store(apart, LANDING, 0)
  Atomics.notify(apart, LANDING)
  return undefined
}

export async function landedApart<T>(
  apart: Int32Array,
  act: () => Promise<T>,
  waited: number = WAITED_AT_MOST
): Promise<T> {
  try {
    await readsLeft(apart, waited)
    return await act()
  } finally {
    reopened(apart)
  }
}

type Shut = { readonly apart: Int32Array; readonly left: Promise<undefined> }

type Keeping = { apart: Int32Array | null; landings: number; shut: Shut | null }

const KEEPING: Keeping = { apart: null, landings: 0, shut: null }

export function landingsKeptApart(apart: Int32Array | null): undefined {
  KEEPING.apart = apart
  return undefined
}

export async function landingApart<T>(act: () => Promise<T>): Promise<T> {
  KEEPING.landings += 1
  try {
    return await act()
  } finally {
    KEEPING.landings -= 1
    const shut = KEEPING.shut
    if (KEEPING.landings === 0 && shut !== null) {
      KEEPING.shut = null
      await shut.left
      reopened(shut.apart)
    }
  }
}

export async function checkoutChanging<T>(
  act: () => T,
  waited: number = WAITED_AT_MOST
): Promise<Awaited<T>> {
  const apart = KEEPING.apart
  if (apart === null) return await act()
  if (KEEPING.landings === 0) return await landedApart(apart, async () => await act(), waited)
  if (KEEPING.shut === null) KEEPING.shut = { apart, left: readsLeft(apart, waited) }
  await KEEPING.shut.left
  return await act()
}
