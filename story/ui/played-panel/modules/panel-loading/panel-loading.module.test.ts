import { expect, test } from "bun:test"
import { drawnFrom } from "akasha/story/ui/played-panel/modules/panel-loading/panel-loading.module.code.ts"
import { offerDrawing } from "akasha/story/ui/played-panel/modules/panel-offering/panel-offering.module.code.tsx"

const SCENE = "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"

const SHOWING = "akasha/story/ui/played-panel/modules/panel-showing/panel-showing.module.code.tsx"

function scriptAsking(path: string, name: string): string {
  return [
    `const { ${name} } = globalThis.akashaDrawing["${path}"]`,
    `const { panelBy } = globalThis.akashaDrawing["${SHOWING}"]`,
    `export const Panel = panelBy(${name}, ({ run }) => ({ turns: run.turns }))`,
  ].join("\n")
}

test("a panel reaching only what the build offers is drawn", async () => {
  offerDrawing()
  expect(typeof (await drawnFrom(scriptAsking(SCENE, "SceneCoverPanel")))).toBe("function")
})

test("a panel asking an offered module for a name it does not offer is left out", async () => {
  offerDrawing()
  expect(await drawnFrom(scriptAsking(SCENE, "SceneCoverPanelGone"))).toBeNull()
})

test("a panel reaching a module the build does not offer is left out", async () => {
  offerDrawing()
  expect(await drawnFrom(scriptAsking("akasha/no/such/module.code.tsx", "Gone"))).toBeNull()
})
