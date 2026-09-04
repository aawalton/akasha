import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelinePrevPassSkips = string

export const pipelinePrevPassSkips = {
  id: "01a06950-236c-7e98-8495-59fceed73937",
  pageTypeSlug: "text-property",
  slug: "pipeline-prev-pass-skips",
  propertySlug: "prev-pass-skips",
  definition:
    "the workflows this run left out because an earlier run of them on the same branch succeeded",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
