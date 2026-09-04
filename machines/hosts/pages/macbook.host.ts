import type { Host } from "../host.page-type.ts"

export const macbook = {
  id: "01a06590-e94f-7756-9d6b-824b7b6c9549",
  pageTypeSlug: "host",
  slug: "macbook",
  definition: "Alan's Apple laptop",
  title: "MacBook",
  settled: true,
} as const satisfies Host
