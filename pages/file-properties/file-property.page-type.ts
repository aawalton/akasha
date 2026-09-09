import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { FileName } from "./properties/file-name.text-property.ts"
import type { HoldsBytes } from "./properties/holds-bytes.boolean-property.ts"
import type { MachineWritten } from "./properties/machine-written.boolean-property.ts"
import type { RunsFileLength } from "./properties/runs-file-length.boolean-property.ts"

export type FileProperty = PageProperty & {
  fileName?: FileName
  machineWritten?: MachineWritten
  runsFileLength?: RunsFileLength
  holdsBytes?: HoldsBytes
}

export const fileProperty = {
  id: "01a04dff-9d7d-7487-9a08-2485e897542f",
  pageTypeSlug: "page-type",
  slug: "file-property",
  definition: "a page property held in its own file",
  pluralSlug: "file-properties",
  partSlugs: [
    "boolean-property/holds-bytes",
    "boolean-property/machine-written",
    "boolean-property/runs-file-length",
    "text-property/file-name",
  ],
  extendsSlug: ["page-type/page-property"],
  properties: [
    { pagePropertySlug: "text-property/file-name", required: false, many: false },
    { pagePropertySlug: "boolean-property/machine-written", required: false, many: false },
    { pagePropertySlug: "boolean-property/runs-file-length", required: false, many: false },
    { pagePropertySlug: "boolean-property/holds-bytes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file property's value is beside its page rather than in the page's own file.",
    },
    {
      invariantKind: "departure",
      statement: "A file property's value goes when its page goes.",
    },
    {
      invariantKind: "departure",
      statement: "A file property's value is loaded only where that value is asked for by name.",
    },
    {
      invariantKind: "absence",
      statement: "No gate reading a page as prose reaches a file property's value.",
    },
  ],
} as const satisfies PageType
