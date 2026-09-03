// WHAT THE PAGES SYSTEM SERVICE DOES NOT HOLD IS REFUSED RATHER THAN READ AS NOTHING.
//
// Every page query in this app used to reach `@shared/pages-query`, which asked this pod's own
// checkout. That reach is severed. The pages are asked of `@akasha/pages-system-service` over
// HTTP now, and the service answers for the page types the akasha index files and for no others.
// `nav`, `game`, `game-turn`, `game-state`, `idle-game`, `idle-save`, `idle-persona-card`,
// `persona-cover-image`, `message`, `sms-consent` and `page-property-definition` are none of them
// filed there, so every question and every write reaching one of those is a feature that is gone
// until its page type stands in akasha.
//
// GONE IS SAID OUT LOUD RATHER THAN DRAWN AS EMPTY. A caller reads an empty list exactly as it
// reads a true nothing, and only one of the two is a fault: a save that went unread is not a
// player with no save, and a seat that went unwritten is not a message delivered. So each site
// below refuses in the shape its caller can carry — a thrown error, a 503 — and none of them
// answers zero, null or the empty set on behalf of a page type it cannot see.

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
