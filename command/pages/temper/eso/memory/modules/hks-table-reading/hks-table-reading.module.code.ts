export type Reader = (at: bigint, length: number) => Buffer | null

export type Held = { readonly type: number; readonly value: bigint }

export type Entry = { readonly key: Held; readonly value: Held }

export type TableRead = { readonly header: readonly bigint[]; readonly entries: readonly Entry[] }

const NIL = 0

const BOOLEAN = 1

const NUMBER = 3

const STRING = 4

const TABLE = 5

const WORD = 8

const HELD = 16

const NODE = 32

const HEADER = 0x40

const NODES_AT = 0x20

const NODES_END_AT = 0x38

const LENGTH_AT = 8

const TEXT_AT = 0x14n

const LONGEST = 4096

const MOST_NODES = 1 << 16

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

function numberOf(value: bigint): number {
  const bytes = Buffer.alloc(WORD)
  bytes.writeBigUInt64LE(value, 0)
  return bytes.readDoubleLE(0)
}

export function shown(read: Reader, held: Held): string {
  const at = held.value.toString(16)
  if (held.type === NIL) return "nil"
  if (held.type === BOOLEAN) return held.value === 0n ? "false" : "true"
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
  const nodes = head.readBigUInt64LE(NODES_AT)
  const count = Number((head.readBigUInt64LE(NODES_END_AT) - nodes) / BigInt(NODE))
  if (count <= 0 || count > MOST_NODES) return { header, entries: [] }
  const bytes = read(nodes, count * NODE)
  if (bytes === null) return { header, entries: [] }
  const entries: Entry[] = []
  for (let offset = 0; offset + NODE <= bytes.length; offset += NODE) {
    const key = heldIn(bytes, offset)
    if (key.type === NIL) continue
    entries.push({ key, value: heldIn(bytes, offset + HELD) })
  }
  return { header, entries }
}
