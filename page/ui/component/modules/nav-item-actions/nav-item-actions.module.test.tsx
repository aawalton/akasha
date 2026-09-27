import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { fireEvent, render } from "@testing-library/react"
import {
  NAV_ITEM_ACTIONS_LABEL,
  NavItemActionsMenu,
  NavItemDeleteDialog,
} from "akasha/page/ui/component/modules/nav-item-actions/nav-item-actions.module.code.tsx"

test("a sidebar item's actions are named and offer nothing until asked", () => {
  let deleted = 0
  const drawn = render(<NavItemActionsMenu onDelete={() => deleted++} />)
  expect(drawn.getByRole("button", { name: NAV_ITEM_ACTIONS_LABEL })).toBeTruthy()
  expect(drawn.queryByText("Delete…")).toBeNull()
  expect(drawn.queryByRole("alertdialog")).toBeNull()
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
  expect(drawn.getByText("Delete Sidebar Item?")).toBeTruthy()
  fireEvent.click(drawn.getByRole("button", { name: "Cancel" }))
  expect(confirmed).toBe(0)
  expect(opened).toEqual([false])
  drawn.unmount()
})

test("the item is deleted only once the question is answered Delete", () => {
  let confirmed = 0
  const drawn = render(
    <NavItemDeleteDialog open={true} onOpenChange={() => {}} onConfirm={() => confirmed++} />
  )
  fireEvent.click(drawn.getByRole("button", { name: "Delete" }))
  expect(confirmed).toBe(1)
  drawn.unmount()
})
