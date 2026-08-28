import { afterEach, describe, expect, it, mock } from "bun:test"
import { getEsoDayStr } from "../../../day/day.ts"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { RrulePropertyBadge } from "../src/property-types/rrule"
import type { PropertyValue } from "../src/property-types/types"
import { requireInput } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const rruleDef: PropertyDefinition = {
  id: "rrule",
  title: "Recurrence",
  type: "rrule",
  config: {},
}

const dueDateDef: PropertyDefinition = {
  id: "dueDate",
  title: "Due Date",
  type: "calendar-date",
  config: {},
}

function openPopoverAndType(input: string): undefined {
  fireEvent.click(screen.getByRole("button"))
  const textbox = requireInput(document.body, 'input[placeholder="every monday at 9am"]')
  fireEvent.change(textbox, { target: { value: input } })
  const saveBtn = Array.from(document.querySelectorAll("button")).find(
    (b) => b.textContent === "Save"
  )
  if (saveBtn === undefined) throw new Error("expected Save button to be in popover")
  fireEvent.click(saveBtn)
  return undefined
}

describe("RrulePropertyBadge — companion dueDate write semantics (#9697)", () => {
  it("defaults dueDate to today (ESO NA reset) when companion exists and dueDate is empty", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <RrulePropertyBadge
        property={rruleDef}
        value={null}
        context="detail"
        editable
        propertyDefinitions={[rruleDef, dueDateDef]}
        pageData={{}}
        onPropertyChange={onPropertyChange}
      />
    )

    openPopoverAndType("every day")

    const today = getEsoDayStr(new Date())
    const dueDateCalls = onPropertyChange.mock.calls.filter(([id]) => id === "dueDate")
    expect(dueDateCalls).toHaveLength(1)
    expect(dueDateCalls[0]?.[1]).toBe(today)
  })

  it("advances an existing dueDate to the next occurrence when the rrule shifts it forward (regression — pre-#9697 behavior)", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <RrulePropertyBadge
        property={rruleDef}
        value={null}
        context="detail"
        editable
        propertyDefinitions={[rruleDef, dueDateDef]}
        pageData={{ dueDate: "2025-01-01" }}
        onPropertyChange={onPropertyChange}
      />
    )

    openPopoverAndType("every monday")

    const dueDateCalls = onPropertyChange.mock.calls.filter(([id]) => id === "dueDate")
    expect(dueDateCalls).toHaveLength(1)
    expect(dueDateCalls[0]?.[1]).toBe("2025-01-06")
  })

  it("does not write dueDate when no calendar-date companion is declared on the page-type", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <RrulePropertyBadge
        property={rruleDef}
        value={null}
        context="detail"
        editable
        propertyDefinitions={[rruleDef]}
        pageData={{}}
        onPropertyChange={onPropertyChange}
      />
    )

    openPopoverAndType("every day")

    const dueDateCalls = onPropertyChange.mock.calls.filter(([id]) => id === "dueDate")
    expect(dueDateCalls).toHaveLength(0)
  })
})
