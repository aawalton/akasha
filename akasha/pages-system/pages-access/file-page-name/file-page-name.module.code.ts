import { lowerUuid } from "@akasha/pages-system/name-format/lower-uuid"

export type Translated =
  | {
      readonly outcome: "named"
      readonly id: string
      readonly pageTypeSlug: string
      readonly name: string
      readonly at: string
    }
  | {
      readonly outcome: "absent"
      readonly id: string
      readonly pageTypeSlug: string
      readonly why: string
    }
  | {
      readonly outcome: "ambiguous"
      readonly id: string
      readonly pageTypeSlug: string
      readonly names: readonly string[]
      readonly ats: readonly string[]
      readonly why: string
    }
  | {
      readonly outcome: "unnamed"
      readonly id: string
      readonly pageTypeSlug: string
      readonly at: string | null
      readonly glob: string
      readonly why: string
    }
  | {
      readonly outcome: "unbacked"
      readonly id: string
      readonly pageTypeSlug: string
      readonly why: string
    }
  | {
      readonly outcome: "unasked"
      readonly id: string
      readonly pageTypeSlug: string
      readonly why: string
    }
  | {
      readonly outcome: "malformed"
      readonly given: string
      readonly pageTypeSlug: string
      readonly why: string
    }

const NOTHING_NAMES =
  "a name here was the file's own stem, worked out from the path a row reported and the glob a page type was filed under. `@akasha/pages-system-service` answers a page's values and reports no path, and there is no glob left to measure a path against. Nothing was looked at, so this says nothing about whether that page is there. A page is reached by its page type and its slug through `@akasha/pages-system-service`, and there is no file name to translate an id into."

export function nameOfPageId(pageTypeSlug: string, id: string): Promise<Translated> {
  if (typeof id !== "string" || !lowerUuid(id.trim().toLowerCase())) {
    const shown = id === "" ? "an empty string" : `\`${String(id)}\``
    return Promise.resolve({
      outcome: "malformed",
      given: String(id),
      pageTypeSlug,
      why: `nameOfPageId(${pageTypeSlug}): ${shown} is not a uuid, so no page was looked for. This is a caller holding the wrong value — an unset variable, a name where an id was meant, or a truncated id — and it says nothing about whether any page is there.`,
    })
  }
  return Promise.resolve({
    outcome: "unasked",
    id: id.trim(),
    pageTypeSlug,
    why: `nameOfPageId(${pageTypeSlug}): ${NOTHING_NAMES}`,
  })
}
