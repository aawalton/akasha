import { describe, expect, test } from "bun:test"
import ts from "typescript"
import {
  collectTypeFamilyEdges,
  collectXmlColonCalls,
  resolveControlFamily,
  scanTstlThisVoidSelfDrop,
} from "./ts-tstl-this-void-self-drop.ts"

const sfOf = (src: string, filePath = "x.d.ts"): ts.SourceFile =>
  ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const familyOf = (...names: readonly string[]): ReadonlySet<string> =>
  new Set(["Control", ...names])

const findingsOf = (src: string, filePath = "x.d.ts", controlFamily = familyOf()) =>
  scanTstlThisVoidSelfDrop(sfOf(src, filePath), { controlFamily })

const namesOf = (src: string, filePath = "x.d.ts", controlFamily = familyOf()): readonly string[] =>
  findingsOf(src, filePath, controlFamily).map((f) => f.name)

describe("scanTstlThisVoidSelfDrop — flags sole-`this: void` New/Subclass constructors", () => {
  test("the #12400 ZoAnchorClass.New bug shape (property-arrow, sole this: void) is flagged", () => {
    const src = [
      "interface ZoAnchorClass {",
      "  New: (",
      "    this: void,",
      "    point?: number,",
      "    relativeTo?: unknown,",
      "    offsetX?: number,",
      "    offsetY?: number",
      "  ) => ZoAnchor",
      "}",
      "",
    ].join("\n")
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("New")
    expect(findings[0]?.kind).toBe("constructor")
  })

  test("single-line property-arrow New with sole this: void is flagged", () => {
    const src = "interface C { New: (this: void, x: number) => T }\n"
    expect(namesOf(src)).toEqual(["New"])
  })

  test("method-signature New with sole this: void is flagged", () => {
    const src = "interface C { New(this: void, x: number): T }\n"
    expect(namesOf(src)).toEqual(["New"])
  })

  test("Subclass with sole this: void is flagged", () => {
    const src = "interface C { Subclass: (this: void) => T }\n"
    expect(namesOf(src)).toEqual(["Subclass"])
  })

  test("generic property-arrow New with sole this: void is flagged", () => {
    const src = "interface C { New: <T = U>(this: void, x: number) => T }\n"
    expect(namesOf(src)).toEqual(["New"])
  })

  test("finding carries 1-indexed line and column at the member name", () => {
    const src = ["interface C {", "  New: (this: void, x: number) => T,", "}", ""].join("\n")
    const f = findingsOf(src)[0]
    expect(f?.line).toBe(2)
    expect(f?.column).toBe(3)
  })
})

describe("scanTstlThisVoidSelfDrop — flags sole-`this: void` control methods (#12424)", () => {
  test("the LibMapPins SetDesaturation bug shape — `{ ... } & Control` — is flagged", () => {
    const src =
      "interface LmpHookPin { backgroundControl?: { SetDesaturation: (this: void, value: number) => void } & Control }\n"
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("SetDesaturation")
    expect(findings[0]?.kind).toBe("control-method")
  })

  test("a control method intersected with a derived family member (TextureControl) is flagged", () => {
    const src = "type T = { SetColor: (this: void, r: number) => void } & TextureControl\n"
    expect(namesOf(src, "x.d.ts", familyOf("TextureControl"))).toEqual(["SetColor"])
  })

  test("a family member whose name does not end in `Control` is flagged all the same", () => {
    const src = "type T = { SetHidden: (this: void, h: boolean) => void } & TopLevelWindow\n"
    expect(namesOf(src, "x.d.ts", familyOf("TopLevelWindow"))).toEqual(["SetHidden"])
  })

  test("a type merely SPELLED `*Control` that reaches no control is clean", () => {
    const src = "type T = { onPick: (this: void, x: number) => void } & HookedControl\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("a single-member type literal aliased onto `& Control` flags every sole-this:void member", () => {
    const src = [
      "type Aug = {",
      "  SetHidden: (this: void, hidden: boolean) => void",
      "  SetAlpha: (this: void, a: number) => void",
      "} & Control",
      "",
    ].join("\n")
    expect(namesOf(src).slice().sort()).toEqual(["SetAlpha", "SetHidden"])
  })

  test("method-signature control method (no this) inside `& Control` — the fix shape — is clean", () => {
    const src = "type T = { SetDesaturation(value: number): void } & Control\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("control method declared `this: Control` (explicit receiver) is clean", () => {
    const src = "type T = { SetDesaturation: (this: Control, value: number) => void } & Control\n"
    expect(findingsOf(src)).toHaveLength(0)
  })
})

describe("scanTstlThisVoidSelfDrop — does NOT flag data-intersected callbacks (owned by property-callback-self)", () => {
  test("the lorebooks grayscale callback — `{ ... } & MapPinLayoutData` — is clean", () => {
    const src =
      "type ShalidorMapPinLayout = MapPinLayoutData & { grayscale?: (this: void) => boolean }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("the lorebooks sizeCallback — `{ ... } & CompassPinLayout` — is clean", () => {
    const src = [
      "type LoreBooksCompassPinLayout = CompassPinLayout & {",
      "  sizeCallback?: (this: void, pin: Control, angle: number) => number",
      "}",
      "",
    ].join("\n")
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("a sole-this:void function member in a BARE type literal (no intersection) is clean", () => {
    const src = "interface C { onToggle: (this: void, on: boolean) => void }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("a sole-this:void function member intersected with a non-Control data type is clean", () => {
    const src = "type T = { cb: (this: void, x: number) => void } & PinLayoutData\n"
    expect(findingsOf(src)).toHaveLength(0)
  })
})

describe("scanTstlThisVoidSelfDrop — does NOT flag legitimate shapes", () => {
  test("the #12381 fixed form `this: ZoAnchorClass` is clean", () => {
    const src = [
      "interface ZoAnchorClass {",
      "  New: (",
      "    this: ZoAnchorClass,",
      "    point?: number,",
      "    offsetY?: number",
      "  ) => ZoAnchor",
      "}",
      "",
    ].join("\n")
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("the sort-filter-list carve-out (this: void followed by explicit self) is clean", () => {
    const src =
      "interface C { New: <T = U>(this: void, self: object, control: Control, ...args: unknown[]) => T }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("this: void followed by a receiver typed `object` (unnamed self) is clean", () => {
    const src = "interface C { New: (this: void, receiver: object, x: number) => T }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("a control-method carve-out — this: void + explicit self inside `& Control` — is clean", () => {
    const src = "type T = { New: (this: void, self: object, control: Control) => T } & Control\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("method-signature New whose nested callback params carry this: void is clean", () => {
    const src = [
      "interface C {",
      "  New<T>(",
      "    factory: (this: void, pool: ObjectPool<T>) => T,",
      "    reset: (this: void, obj: T) => void",
      "  ): ObjectPool<T>",
      "}",
      "",
    ].join("\n")
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("method-signature New without any this param is clean", () => {
    const src = "interface C { New(x: number): T }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("New with this: Receiver (colon-call self) is clean", () => {
    const src = "interface C { New(this: C): T }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("non-New/Subclass member with sole this: void in a bare interface is not flagged", () => {
    const src = "interface C { Mount: (this: void, x: number) => T }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("scanner is path-agnostic — a New constructor in a .ts source is flagged (file scope is the runner's job)", () => {
    const src = "interface C { New: (this: void, x: number) => T }\n"
    expect(namesOf(src, "x.ts")).toEqual(["New"])
  })

  test("empty interface and a New without a function type are clean", () => {
    expect(findingsOf("interface C {}\ninterface D { New: number }\n")).toHaveLength(0)
  })
})

describe("collectTypeFamilyEdges / resolveControlFamily — the derived control family", () => {
  const familyFrom = (src: string): ReadonlySet<string> => {
    const edges = new Map<string, Set<string>>()
    for (const [name, reaches] of collectTypeFamilyEdges(sfOf(src))) {
      edges.set(name, new Set(reaches))
    }
    return resolveControlFamily(edges)
  }

  test("a heritage clause reaching Control is family, however many hops away", () => {
    const src = [
      "interface Control {}",
      "interface ButtonControl extends Control {}",
      "interface ButtonGroupButton extends ButtonControl {}",
      "",
    ].join("\n")
    expect([...familyFrom(src)].sort()).toEqual(["ButtonControl", "ButtonGroupButton", "Control"])
  })

  test("an alias, an intersection operand and a union operand each carry the family", () => {
    const src = [
      "interface Control {}",
      "type Aliased = Control",
      "type Intersected = { extra: number } & Control",
      "type Maybe = Control | undefined",
      "",
    ].join("\n")
    expect([...familyFrom(src)].sort()).toEqual(["Aliased", "Control", "Intersected", "Maybe"])
  })

  test("a type that only SOUNDS like a control is not family", () => {
    const src = [
      "interface Control {}",
      "type SelfWithControl = { control: Control }",
      "type HookedControl = { lbhooked?: boolean }",
      "type CtControl = number",
      "",
    ].join("\n")
    expect([...familyFrom(src)]).toEqual(["Control"])
  })

  test("a corpus declaring no Control at all is a raise, not a family of one", () => {
    expect(() => familyFrom("interface TextureControl extends Control {}\n")).toThrow(/Control/)
  })
})

describe("collectXmlColonCalls — parses Receiver:Method colon-calls from addon XML", () => {
  test("extracts a simple handler colon-call", () => {
    const xml = "<OnMouseExit>IIfA:GuiHideTooltip(self)</OnMouseExit>"
    expect(collectXmlColonCalls(xml).has("IIfA:GuiHideTooltip")).toBe(true)
  })

  test("extracts a dotted-receiver colon-call (IIfA.CharCurrencyFrame:Show)", () => {
    const xml = "<OnMouseEnter>IIfA.CharCurrencyFrame:Show(self)</OnMouseEnter>"
    expect(collectXmlColonCalls(xml).has("IIfA.CharCurrencyFrame:Show")).toBe(true)
  })

  test("a commented-out colon-call is NOT collected", () => {
    const xml = "<!-- <OnShow>IIfA:GuiSetupDropdown(self)</OnShow> -->"
    expect(collectXmlColonCalls(xml).has("IIfA:GuiSetupDropdown")).toBe(false)
  })

  test("collects multiple distinct colon-calls from one document", () => {
    const xml = [
      "<Down>IIfA:ToggleInventoryFrame()</Down>",
      "<OnMouseUp>IIfA:GUILock(false)</OnMouseUp>",
    ].join("\n")
    const set = collectXmlColonCalls(xml)
    expect(set.has("IIfA:ToggleInventoryFrame")).toBe(true)
    expect(set.has("IIfA:GUILock")).toBe(true)
  })
})

describe("scanTstlThisVoidSelfDrop — flags XML-colon-called sole-`this: void` handler assignments", () => {
  const xmlOf = (...keys: readonly string[]) => ({ xmlColonCalls: new Set<string>(keys) })
  const handlerSrc = (thisType: string) =>
    `IIfA.GuiShowTooltip = function (${thisType}, control: Control, tooltiptext: string): undefined {}\n`

  test("the #13254 GuiShowTooltip crasher shape (this: void + XML colon-call) is flagged", () => {
    const findings = scanTstlThisVoidSelfDrop(
      sfOf(handlerSrc("this: void"), "x.ts"),
      xmlOf("IIfA:GuiShowTooltip")
    )
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("IIfA:GuiShowTooltip")
    expect(findings[0]?.kind).toBe("xml-handler")
  })

  test("the corrected form (this: IIfA) is clean even when XML colon-calls it", () => {
    const findings = scanTstlThisVoidSelfDrop(
      sfOf(handlerSrc("this: IIfA"), "x.ts"),
      xmlOf("IIfA:GuiShowTooltip")
    )
    expect(findings).toHaveLength(0)
  })

  test("an arrow-function handler assignment is flagged the same way", () => {
    const src = "IIfA.onResizeStart = (this: void): undefined => {}\n"
    const findings = scanTstlThisVoidSelfDrop(sfOf(src, "x.ts"), xmlOf("IIfA:onResizeStart"))
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("IIfA:onResizeStart")
    expect(findings[0]?.kind).toBe("xml-handler")
  })

  test("a this: void handler the XML never colon-calls is NOT flagged (dot-called callback)", () => {
    const src =
      "IIfA.GuiOnScroll = function (this: void, control: Control, delta: number): undefined {}\n"
    expect(scanTstlThisVoidSelfDrop(sfOf(src, "x.ts"), xmlOf()).length).toBe(0)
    expect(scanTstlThisVoidSelfDrop(sfOf(src, "x.ts"), xmlOf("IIfA:Something")).length).toBe(0)
  })

  test("without an XML colon-call set, no handler-assignment finding is produced", () => {
    const findings = scanTstlThisVoidSelfDrop(sfOf(handlerSrc("this: void"), "x.ts"), {})
    expect(findings).toHaveLength(0)
  })

  test("the receiver+method key prevents over-flagging a same-named handler on a different receiver", () => {
    const src = "Other.GuiShowTooltip = function (this: void, control: Control): undefined {}\n"
    expect(scanTstlThisVoidSelfDrop(sfOf(src, "x.ts"), xmlOf("IIfA:GuiShowTooltip")).length).toBe(0)
  })

  test("the explicit-receiver carve-out still applies (this: void, self) — not flagged", () => {
    const src = "IIfA.Helper = function (this: void, self: object, x: number): undefined {}\n"
    expect(scanTstlThisVoidSelfDrop(sfOf(src, "x.ts"), xmlOf("IIfA:Helper")).length).toBe(0)
  })
})
