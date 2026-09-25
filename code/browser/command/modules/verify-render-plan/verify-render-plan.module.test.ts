import { expect, test } from "bun:test"
import { planRenderSettleWait } from "akasha/code/browser/command/modules/verify-render-plan/verify-render-plan.module.code.ts"
import { Skeleton } from "akasha/design/interface/primitive/modules/skeleton/skeleton.module.code.tsx"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

const ANSWERED = {
  expectText: undefined,
  httpStatus: 200,
  finalPath: "/home",
  signInPath: "/sign-in",
  rootSelector: "main",
  hydrationSelector: undefined,
}

const SKELETON_MARK = 'data-slot="skeleton"'

function pendingFor(rootSelector: string): string {
  const settle = planRenderSettleWait({ ...ANSWERED, rootSelector })
  if (settle.kind !== "root-populated") {
    throw new Error(`a page that answered settles on its root, and this planned \`${settle.kind}\``)
  }
  return settle.pendingSelector
}

test("a populated root is waited on until no skeleton is drawn under that root", () => {
  expect(pendingFor("main")).toBe(`:is(main) [${SKELETON_MARK}]`)
})

test("a root said as a list of selectors waits on a skeleton under any of them", () => {
  expect(pendingFor("main, #root")).toBe(`:is(main, #root) [${SKELETON_MARK}]`)
})

test("the skeleton the settle waits out is the one the skeleton primitive draws", () => {
  expect(renderToStaticMarkup(createElement(Skeleton))).toContain(SKELETON_MARK)
})

test("a page that landed on sign-in is not waited on for a skeleton", () => {
  const settle = planRenderSettleWait({ ...ANSWERED, finalPath: "/sign-in" })
  expect(settle.kind).toBe("none")
})
