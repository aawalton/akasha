const MESSAGE_PAGE_TYPE_SLUG = "message"

const NAMED_HOLDS = 12

export function messageNamed(id: string): string {
  return `${MESSAGE_PAGE_TYPE_SLUG}-${id.replace(/-/g, "").slice(-NAMED_HOLDS)}`
}
