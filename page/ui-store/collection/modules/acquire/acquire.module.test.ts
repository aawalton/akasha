import { expect, test } from "bun:test"
import {
  acquireShape,
  acquireSlug,
  createAcquireRegistry,
} from "akasha/page/ui-store/collection/modules/acquire/acquire.module.code.ts"
import {
  namedShapeDescriptor,
  type ShapeDescriptor,
} from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"

function registryAttaching(attached: ShapeDescriptor[]) {
  return createAcquireRegistry((descriptor) => {
    attached.push(descriptor)
    return () => undefined
  })
}

test("a page type named by its slug is attached", () => {
  const attached: ShapeDescriptor[] = []
  acquireSlug(registryAttaching(attached), "story-chapter-read")
  expect(attached.map((one) => one.pageTypeSlug)).toEqual(["story-chapter-read"])
})

test("a page type named by an empty slug is refused where it is asked for, and nothing is attached", () => {
  const attached: ShapeDescriptor[] = []
  const registry = registryAttaching(attached)
  expect(() => acquireSlug(registry, "")).toThrow("an empty page type")
  expect(attached).toEqual([])
  expect(registry.shapes.size).toBe(0)
})

test("pages named under an empty page type are refused where they are asked for", () => {
  const attached: ShapeDescriptor[] = []
  const registry = registryAttaching(attached)
  const named = namedShapeDescriptor("", { by: "id", values: ["01a0c98d"] })
  expect(() => acquireShape(registry, named)).toThrow("an empty page type")
  expect(attached).toEqual([])
})
