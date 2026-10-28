import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { act, render } from "@testing-library/react"
import { LayoutRouterProvider } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Tabs,
  UnderlineTabsTrigger,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import {
  PlaceDrawn,
  PlaceHeaded,
  PlaceTabs,
} from "akasha/story/ui/modules/place-head/place-head.module.code.tsx"
import { type ReactNode, useState } from "react"

const ROUTED = { pathname: "/", searchParams: new URLSearchParams() }

let showLate: () => void = () => undefined

function Late({ drawn }: { drawn: ReactNode }) {
  const [shown, setShown] = useState(false)
  showLate = () => setShown(true)
  return shown ? drawn : null
}

function placed(body: ReactNode) {
  return render(
    <LayoutRouterProvider value={ROUTED}>
      <PlaceHeaded label="Character" onClose={() => undefined}>
        <div>
          <PlaceDrawn>{body}</PlaceDrawn>
        </div>
      </PlaceHeaded>
    </LayoutRouterProvider>
  )
}

const SHEET = (
  <Tabs value="stats">
    <PlaceTabs>
      <UnderlineTabsTrigger value="stats">Stats</UnderlineTabsTrigger>
      <UnderlineTabsTrigger value="paths">Paths</UnderlineTabsTrigger>
    </PlaceTabs>
    <p>Nala</p>
  </Tabs>
)

test("a place whose panels have drawn nothing yet shows it is waiting rather than an empty body", () => {
  const shown = placed(<Late drawn={SHEET} />)
  expect(shown.container.querySelector("[data-waiting]")).not.toBeNull()
  expect(shown.queryByText("Nala")).toBeNull()
  shown.unmount()
})

test("once a panel draws, the waiting goes and its tabs land in the head over its body", async () => {
  const shown = placed(<Late drawn={SHEET} />)
  await act(async () => {
    showLate()
  })
  expect(shown.container.querySelector("[data-waiting]")).toBeNull()
  expect(shown.getByText("Nala")).toBeDefined()
  const head = shown.container.querySelector("header")
  expect(head?.querySelectorAll("[role=tab]").length).toBe(2)
  shown.unmount()
})
