export const DRY_RUN = "--dry-run"

export type Named =
  | { readonly slug: string; readonly dryRun: boolean }
  | { readonly refused: string }

export function slugIn(
  argv: readonly string[],
  calledAs: string,
  allowed: readonly string[]
): Named {
  const named = argv.filter((one) => !one.startsWith("-"))
  const strange = argv.find((one) => one.startsWith("-") && !allowed.includes(one))
  if (strange !== undefined) {
    return { refused: `\`${strange}\` is nothing \`${calledAs}\` takes` }
  }
  const slug = named[0]
  if (slug === undefined) return { refused: "name the service by its slug" }
  if (named.length > 1) return { refused: "this reaches one service at a time" }
  return { slug, dryRun: argv.includes(DRY_RUN) }
}
