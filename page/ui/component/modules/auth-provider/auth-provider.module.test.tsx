import { expect, test } from "bun:test"
import { holdBeforeARoute } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"

test("a signed-in reader has the store hold page types and no other pages before a route draws", async () => {
  const held: string[] = []
  await holdBeforeARoute({
    acquireSlug: (slug) => {
      held.push(slug)
    },
    whenSlugReady: () => Promise.resolve(),
  })

  expect(held).toEqual(["page-type"])
})
