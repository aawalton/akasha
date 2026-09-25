import { expect, test } from "bun:test"
import { shapesNamed } from "akasha/page/ui/cache/modules/tanstack-live/tanstack-live.module.code.ts"
import { namedShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"

const REQUESTED = namedShapeDescriptor("feature-request", { by: "slug", values: ["test"] })
const PRODUCT = namedShapeDescriptor("domain", { by: "slug", values: ["alan"] })
const PROPOSER = namedShapeDescriptor("contributor", { by: "slug", values: ["contributor-9bc4"] })
const CROSS = { shapeKey: "cross:unread" }

test("pages of a page type the reader's roster leaves out are not asked for", () => {
  expect(shapesNamed([REQUESTED, PRODUCT, PROPOSER], ["feature-request"])).toEqual([REQUESTED])
})

test("a shape naming no page type is asked for whatever the roster names", () => {
  expect(shapesNamed([CROSS, PRODUCT], [])).toEqual([CROSS])
})
