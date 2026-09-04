import type { PageProperty } from "../page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"
import type { MachineWritten } from "./properties/machine-written.boolean-property.ts"
import type { RunsFileLength } from "./properties/runs-file-length.boolean-property.ts"

export type FileProperty = PageProperty & {
  machineWritten?: MachineWritten
  runsFileLength?: RunsFileLength
}

export const fileProperty = {
  id: "01a04dff-9d7d-7487-9a08-2485e897542f",
  pageTypeSlug: "page-type",
  slug: "file-property",
  definition: "a page property held in its own file",
  pluralSlug: "file-properties",
  partSlugs: ["boolean-property/machine-written", "boolean-property/runs-file-length"],
  extendsSlug: ["page-type/page-property"],
  properties: [
    { pagePropertySlug: "machine-written", required: false, many: false },
    { pagePropertySlug: "runs-file-length", required: false, many: false },
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
