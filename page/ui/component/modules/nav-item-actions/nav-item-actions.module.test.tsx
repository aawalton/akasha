import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { render as drawnBare, fireEvent } from "@testing-library/react"
import { PhrasesSeeded } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { dialogCancel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-cancel.web-phrase.ts"
import { dialogDelete } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-delete.web-phrase.ts"
import { navItemActionsLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/nav-item-actions-label.web-phrase.ts"
import { navItemDeleteMenu } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/nav-item-delete-menu.web-phrase.ts"
import { navItemDeleteTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/nav-item-delete-title.web-phrase.ts"
import {
  NavItemActionsMenu,
  NavItemDeleteDialog,
} from "akasha/page/ui/component/modules/nav-item-actions/nav-item-actions.module.code.tsx"
import type { ReactNode } from "react"

const SEED = [
  dialogCancel,
  dialogDelete,
  navItemActionsLabel,
  navItemDeleteMenu,
  navItemDeleteTitle,
]

const NAV_ITEM_ACTIONS_LABEL = navItemActionsLabel.title

function render(node: ReactNode) {
  return drawnBare(<PhrasesSeeded phrases={SEED}>{node}</PhrasesSeeded>)
}

test("a sidebar item's actions are named and offer nothing until asked", () => {
  let deleted = 0
  const drawn = render(<NavItemActionsMenu onDelete={() => deleted++} />)
  expect(drawn.getByRole("button", { name: NAV_ITEM_ACTIONS_LABEL })).toBeTruthy()
  expect(drawn.queryByText(navItemDeleteMenu.title)).toBeNull()
  expect(drawn.queryByRole("alertdialog")).toBeNull()
  expect(deleted).toBe(0)
  drawn.unmount()
})

test("clicking a sidebar item's actions button does not follow the item's link", () => {
  const drawn = render(
    <a href="/home">
      <NavItemActionsMenu onDelete={() => {}} />
    </a>
  )
  const clicked = fireEvent.click(drawn.getByRole("button", { name: NAV_ITEM_ACTIONS_LABEL }))
  expect(clicked).toBe(false)
  drawn.unmount()
})

test("answering the question reaches nothing around the sidebar item", async () => {
  let rowClicks = 0
  let deleted = 0
  const drawn = render(
    <div role="button" tabIndex={0} onClick={() => rowClicks++} onKeyDown={() => {}}>
      <NavItemActionsMenu onDelete={() => deleted++} />
    </div>
  )
  fireEvent.keyDown(drawn.getByRole("button", { name: NAV_ITEM_ACTIONS_LABEL }), { key: "Enter" })
  fireEvent.click(await drawn.findByRole("menuitem"))
  const cancel = await drawn.findByRole("button", { name: dialogCancel.title })
  rowClicks = 0
  fireEvent.click(cancel)
  expect(rowClicks).toBe(0)
  expect(deleted).toBe(0)
  drawn.unmount()
})

test("cancelling the question deletes nothing", () => {
  let confirmed = 0
  const opened: boolean[] = []
  const drawn = render(
    <NavItemDeleteDialog
      open={true}
      onOpenChange={(open) => opened.push(open)}
      onConfirm={() => confirmed++}
    />
  )
  expect(drawn.getByText(navItemDeleteTitle.title)).toBeTruthy()
  fireEvent.click(drawn.getByRole("button", { name: dialogCancel.title }))
  expect(confirmed).toBe(0)
  expect(opened).toEqual([false])
  drawn.unmount()
})

test("the item is deleted only once the question is answered Delete", () => {
  let confirmed = 0
  const drawn = render(
    <NavItemDeleteDialog open={true} onOpenChange={() => {}} onConfirm={() => confirmed++} />
  )
  fireEvent.click(drawn.getByRole("button", { name: dialogDelete.title }))
  expect(confirmed).toBe(1)
  drawn.unmount()
})
