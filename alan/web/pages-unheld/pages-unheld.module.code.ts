export function unheld(pageTypeSlug: string, wanted: string): string {
  return (
    `\`${pageTypeSlug}\` is no page type the pages system service holds, so ${wanted} went ` +
    "unread. Answering as though there were none would draw an absence this cannot see."
  )
}

export function unwritten(pageTypeSlug: string, wanted: string): string {
  return (
    `\`${pageTypeSlug}\` is no page type the pages system service holds, so ${wanted} went ` +
    "unwritten. Answering as though it landed would say a thing happened that did not."
  )
}
