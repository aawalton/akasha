import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ticking } from "akasha/infrastructure/service/akasha-service/service-inference/modules/inference-watching/inference-watching.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const PAGE = "pages/held-model.service-inference.ts"

function rooted(): string {
  const root = mkdtempSync("/var/tmp/inference-watching-")
  mkdirSync(join(root, "pages"), { recursive: true })
  writeFileSync(join(root, PAGE), 'export const heldModel = { slug: "held-model" } as const\n')
  return root
}

test("a run leaves each inference service carrying its verdict and says each verdict it wrote", async () => {
  const root = rooted()
  const said = await ticking(root, new Date("2026-09-25T16:00:00.000Z"), () =>
    Promise.resolve([{ slug: "held-model", pagePath: PAGE, broken: "held-model is silent" }])
  )
  expect(said).toEqual(["held-model is broken: held-model is silent"])
  expect(uncommittedIn(root, PAGE)).toEqual({ well: false })
  rmSync(root, { recursive: true, force: true })
})
