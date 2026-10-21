export type Reader = (at: bigint, length: number) => Buffer | null

export type Held = { readonly type: number; readonly value: bigint }

type Entry = { readonly key: Held; readonly value: Held }

type TableRead = { readonly header: readonly bigint[]; readonly entries: readonly Entry[] }

export type LuaData = null | boolean | number | string | { readonly [key: string]: LuaData }

const NIL = 0

const BOOLEAN = 1

const NUMBER = 3

const STRING = 4

const TABLE = 5

const WORD = 8

const HELD = 16

const NODE = 32

const HEADER = 0x40

const MASK_AT = 0x1c

const NODES_AT = 0x20

const ARRAY_AT = 0x28

const ARRAY_SIZE_AT = 0x30

const LENGTH_AT = 8

const TEXT_AT = 0x14n

const LONGEST = 4096

const MOST_NODES = 1 << 16

const DEEPEST = 32

function heldIn(bytes: Buffer, offset: number): Held {
  return { type: bytes.readUInt32LE(offset), value: bytes.readBigUInt64LE(offset + WORD) }
}

export function textAt(read: Reader, at: bigint): string | null {
  const head = read(at, Number(TEXT_AT))
  if (head === null || head.length < Number(TEXT_AT)) return null
  const length = Number(head.readBigUInt64LE(LENGTH_AT))
  if (length > LONGEST) return null
  const body = read(at + TEXT_AT, length)
  return body === null ? null : body.toString("utf8")
}

const TRUTH_BYTE = 0xffn

function truthOf(value: bigint): boolean {
  return (value & TRUTH_BYTE) !== 0n
}

function numberOf(value: bigint): number {
  const bytes = Buffer.alloc(WORD)
  bytes.writeBigUInt64LE(value, 0)
  return bytes.readDoubleLE(0)
}

export function shown(read: Reader, held: Held): string {
  const at = held.value.toString(16)
  if (held.type === NIL) return "nil"
  if (held.type === BOOLEAN) return String(truthOf(held.value))
  if (held.type === NUMBER) return String(numberOf(held.value))
  if (held.type === STRING) return JSON.stringify(textAt(read, held.value))
  if (held.type === TABLE) return `table ${at}`
  return `type ${held.type} at ${at}`
}

export function tableAt(read: Reader, table: bigint): TableRead | null {
  const head = read(table, HEADER)
  if (head === null || head.length < HEADER) return null
  const header: bigint[] = []
  for (let offset = 0; offset < HEADER; offset += WORD) header.push(head.readBigUInt64LE(offset))
  return {
    header,
    entries: [
      ...arrayEntries(read, head.readBigUInt64LE(ARRAY_AT), head.readUInt32LE(ARRAY_SIZE_AT)),
      ...nodeEntries(read, head.readBigUInt64LE(NODES_AT), head.readUInt32LE(MASK_AT) + 1),
    ],
  }
}

export function heldTable(at: bigint): Held {
  return { type: TABLE, value: at }
}

export function tableIn(held: Held | null): bigint | null {
  return held !== null && held.type === TABLE ? held.value : null
}

export function fieldOf(read: Reader, table: bigint, name: string): Held | null {
  const held = tableAt(read, table)
  if (held === null) return null
  for (const entry of held.entries) {
    if (entry.key.type === STRING && textAt(read, entry.key.value) === name) return entry.value
  }
  return null
}

function keyOf(read: Reader, key: Held): string | null {
  if (key.type === NUMBER) return String(numberOf(key.value))
  if (key.type === STRING) return textAt(read, key.value)
  return null
}

export function dataOf(read: Reader, held: Held, depth = 0): LuaData | undefined {
  if (held.type === NIL) return null
  if (held.type === BOOLEAN) return truthOf(held.value)
  if (held.type === NUMBER) return numberOf(held.value)
  if (held.type === STRING) return textAt(read, held.value) ?? undefined
  if (held.type !== TABLE || depth >= DEEPEST) return undefined
  const table = tableAt(read, held.value)
  if (table === null) return undefined
  const data: Record<string, LuaData> = {}
  for (const entry of table.entries) {
    const key = keyOf(read, entry.key)
    const value = dataOf(read, entry.value, depth + 1)
    if (key !== null && value !== undefined) data[key] = value
  }
  return data
}

function arrayEntries(read: Reader, array: bigint, size: number): readonly Entry[] {
  if (array === 0n || size <= 0 || size > MOST_NODES) return []
  const bytes = read(array, size * HELD)
  if (bytes === null) return []
  const entries: Entry[] = []
  for (let offset = 0; offset + HELD <= bytes.length; offset += HELD) {
    const value = heldIn(bytes, offset)
    if (value.type === NIL) continue
    const key = Buffer.alloc(WORD)
    key.writeDoubleLE(offset / HELD + 1, 0)
    entries.push({ key: { type: NUMBER, value: key.readBigUInt64LE(0) }, value })
  }
  return entries
}

function nodeEntries(read: Reader, nodes: bigint, count: number): readonly Entry[] {
  if (nodes === 0n || count > MOST_NODES) return []
  const bytes = read(nodes, count * NODE)
  if (bytes === null) return []
  const entries: Entry[] = []
  for (let offset = 0; offset + NODE <= bytes.length; offset += NODE) {
    const key = heldIn(bytes, offset)
    if (key.type === NIL) continue
    entries.push({ key, value: heldIn(bytes, offset + HELD) })
  }
  return entries
}
