import type { FileProperty } from "@akasha/pages/file-property"

export type AppLayout = "tsx"

export const appLayout = {
  id: "01a07917-b971-76f3-8ada-fc17be46e258",
  pageTypeSlug: "file-property",
  slug: "app-layout",
  propertySlug: "app-layout",
  definition: "the route a signed-in reader's routes render inside",
  fileName: "routes/_app-layout.tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This route is reached by the route table rather than by a url.",
    },
    {
      invariantKind: "departure",
      statement: "A router app serving a signed-out reader alone states no app layout.",
    },
  ],
} as const satisfies FileProperty
