export type Read = { readonly asked: true } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals = argv.map((one) => `\`${one}\` is no word this takes — it takes no word at all`)
  if (refusals.length > 0) return { refused: refusals }
  return { asked: true }
}
