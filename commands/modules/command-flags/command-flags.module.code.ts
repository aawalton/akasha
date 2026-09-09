import { BREAK_GLASS, textAt } from "../../../command-system/asking/asking.module.code.ts"

export const FILE_PATH = "--file-path"

export const MESSAGE = "--message"

export const MESSAGE_FILE = "--message-file"

export const CONTENT_FILE = "--content-file"

export const REMOVE = "--remove"

export function valuesOf(
  argv: readonly string[],
  flag: string,
  valued: readonly string[]
): readonly (string | null)[] {
  const found: (string | null)[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === flag) {
      const value = argv[at + 1]
      found.push(value === undefined ? null : value)
      at += 1
      continue
    }
    if (valued.includes(one)) at += 1
  }
  return found
}

export function unknownIn(
  argv: readonly string[],
  valued: readonly string[],
  bare: readonly string[]
): readonly string[] {
  const said: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (valued.includes(one)) {
      at += 1
      continue
    }
    if (bare.includes(one)) continue
    said.push(`\`${one}\` is no flag this takes`)
  }
  return said
}

export function glassIn(
  argv: readonly string[],
  valued: readonly string[]
): { readonly glass: string | null } | { readonly refusals: readonly string[] } {
  const said = valuesOf(argv, BREAK_GLASS, valued)
  if (said.length === 0) return { glass: null }
  if (said.length > 1) {
    return {
      refusals: [`${BREAK_GLASS} is given ${said.length} times, and one call bypasses once`],
    }
  }
  const one = said[0]
  if (one === undefined || one === null || one.trim() === "") {
    return {
      refusals: [`${BREAK_GLASS} takes the reason no check is to run, and this one is empty`],
    }
  }
  return { glass: one.trim() }
}

export function messageIn(
  argv: readonly string[],
  valued: readonly string[]
): { readonly message: string | null } | { readonly refusals: readonly string[] } {
  const said = valuesOf(argv, MESSAGE, valued)
  const from = valuesOf(argv, MESSAGE_FILE, valued)
  const refusals: string[] = []
  if (said.length > 1)
    refusals.push(`${MESSAGE} is given ${said.length} times, and one commit carries one message`)
  if (from.length > 1)
    refusals.push(
      `${MESSAGE_FILE} is given ${from.length} times, and one commit carries one message`
    )
  if (said.length > 0 && from.length > 0) {
    refusals.push(`${MESSAGE} and ${MESSAGE_FILE} each carry the message, and both are given`)
  }
  const one = said[0]
  const two = from[0]
  if (one === null) refusals.push(`${MESSAGE} takes the commit message, and none follows it`)
  if (two === null)
    refusals.push(`${MESSAGE_FILE} takes a file to read the message from, and none follows it`)
  if (refusals.length > 0) return { refusals }
  let message: string | null = null
  if (typeof one === "string") message = one.trim()
  if (typeof two === "string") {
    const read = textAt(two)
    if (read === null) return { refusals: [`${MESSAGE_FILE} ${two} could not be read as text`] }
    message = read.trim()
  }
  if (message === "")
    return { refusals: ["the message given is empty, and a commit says what it is for"] }
  return { message }
}
