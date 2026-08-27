export const RESERVED_SLUGS_UNIVERSAL: ReadonlySet<string> = new Set([
  "_next",
  "actions",
  "api",
  "auth",
])

export function validateSlugReserved(value: unknown, fieldName: "slug" | "pluralSlug"): undefined {
  if (typeof value !== "string") return
  if (RESERVED_SLUGS_UNIVERSAL.has(value)) {
    throw new Error(
      `${fieldName} '${value}' is reserved (collides with a static Next.js route segment)`
    )
  }
}
