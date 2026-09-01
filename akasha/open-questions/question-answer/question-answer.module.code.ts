export const ANSWERED_OPTION_INDEX_KEY = "answeredOptionIndex"

export const RECONCILED_AT_KEY = "reconciledAt"

export function selectTappedOptionIndex(args: {
  readonly options: readonly string[]
  readonly claimedIndex: number | undefined
  readonly content: string
}): number | null {
  const { options, claimedIndex, content } = args
  if (claimedIndex === undefined) return null
  if (!Number.isInteger(claimedIndex) || claimedIndex < 0) return null
  const option = options[claimedIndex]
  if (option === undefined) return null
  return option.trim() === content.trim() ? claimedIndex : null
}
