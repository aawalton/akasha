import { afterEach, describe, expect, mock, test } from "bun:test"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import type { QuickAddConfig } from "@shared/pages-core/schema/quick-add"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PageWithProperties } from "../../supabase/types"
import { QuickAddForm } from "./quick-add-form"

afterEach(() => {
  cleanup()
})

const titleOnlyConfig: QuickAddConfig = {
  titlePropertyId: "title",
}

const projectConfig: QuickAddConfig = {
  titlePropertyId: "title",
  notesPropertyId: "notes",
  inlineTokens: [
    {
      sigil: "@",
      propertyId: "tags",
      autocompleteFrom: { kind: "self-property" },
      defaults: ["inbox"],
    },
  ],
  pickers: [
    {
      propertyId: "status",
      defaultValue: "exploration",
    },
  ],
  fixedDefaults: { sortOrder: 0 },
}

const statusDefinition: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "exploration", label: "Exploration" },
      { id: "active", label: "Active" },
    ],
  },
}

function renderForm(props: {
  config: QuickAddConfig
  propertyDefinitions?: readonly PropertyDefinition[]
  existingPages?: readonly PageWithProperties[]
  onSubmit: (p: Readonly<Record<string, ReadonlyJSONValue>>) => void
}) {
  return render(
    <QuickAddForm
      formId="t"
      quickAdd={props.config}
      propertyDefinitions={props.propertyDefinitions ?? []}
      existingPages={props.existingPages ?? []}
      disabled={false}
      onSubmit={props.onSubmit}
    />
  )
}

function getTitleInput(): HTMLInputElement {
  const el = screen.getByPlaceholderText("Title...")
  if (!(el instanceof HTMLInputElement)) throw new Error("title input not found")
  return el
}

function submit(form: HTMLElement) {
  const input = form.querySelector("input")
  if (!(input instanceof HTMLInputElement)) throw new Error("form has no input")
  fireEvent.keyDown(input, { key: "Enter", metaKey: true })
}

describe("QuickAddForm", () => {
  test("title-only config: submits { title }", () => {
    const onSubmit = mock((_p: Readonly<Record<string, ReadonlyJSONValue>>) => {})
    const { container } = renderForm({ config: titleOnlyConfig, onSubmit })

    fireEvent.change(getTitleInput(), { target: { value: "Hello" } })
    submit(container)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({ title: "Hello" })
  })

  test("title-only config: renders no chip row content and no notes textarea", () => {
    renderForm({ config: titleOnlyConfig, onSubmit: () => {} })
    expect(screen.queryByPlaceholderText("What needs to be done?")).toBeNull()
  })

  test("project-style: parses @foo into a chip and merges with default tags on submit", () => {
    const onSubmit = mock((_p: Readonly<Record<string, ReadonlyJSONValue>>) => {})
    const { container } = renderForm({
      config: projectConfig,
      propertyDefinitions: [statusDefinition],
      onSubmit,
    })

    fireEvent.change(getTitleInput(), { target: { value: "Hello @foo" } })
    expect(screen.getByText("@foo")).toBeDefined()
    expect(screen.getByText("@inbox")).toBeDefined()

    submit(container)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      sortOrder: 0,
      title: "Hello",
      tags: ["inbox", "foo"],
      status: "exploration",
      notes: "",
    })
  })

  test("default-tag dismissal removes inbox from the submitted tags", () => {
    const onSubmit = mock((_p: Readonly<Record<string, ReadonlyJSONValue>>) => {})
    const { container } = renderForm({
      config: projectConfig,
      propertyDefinitions: [statusDefinition],
      onSubmit,
    })

    fireEvent.change(getTitleInput(), { target: { value: "Hello @foo" } })
    fireEvent.click(screen.getByLabelText("Remove default @inbox"))
    submit(container)

    const out = onSubmit.mock.calls[0]?.[0]
    expect(out?.tags).toEqual(["foo"])
  })

  test("token suppression: dismissing parsed @foo strips it from tags but keeps the literal text in title", () => {
    const onSubmit = mock((_p: Readonly<Record<string, ReadonlyJSONValue>>) => {})
    const { container } = renderForm({
      config: projectConfig,
      propertyDefinitions: [statusDefinition],
      onSubmit,
    })

    fireEvent.change(getTitleInput(), { target: { value: "Hello @foo" } })
    fireEvent.click(screen.getByLabelText("Remove @foo"))
    submit(container)

    const out = onSubmit.mock.calls[0]?.[0]
    expect(out?.title).toBe("Hello @foo")
    expect(out?.tags).toEqual(["inbox"])
  })

  test("suppression resets on title edit: chip reappears after typing more", () => {
    const onSubmit = mock((_p: Readonly<Record<string, ReadonlyJSONValue>>) => {})
    renderForm({
      config: projectConfig,
      propertyDefinitions: [statusDefinition],
      onSubmit,
    })

    const input = getTitleInput()
    fireEvent.change(input, { target: { value: "Hello @foo" } })
    fireEvent.click(screen.getByLabelText("Remove @foo"))
    expect(screen.queryByText("@foo")).toBeNull()

    fireEvent.change(input, { target: { value: "Hello @foo bar" } })
    expect(screen.getByText("@foo")).toBeDefined()
  })
})
