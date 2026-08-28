import type { Value, Values } from "./formula.ts"
import type { Expression, TextPart } from "./tree.ts"

const absent: Value = { kind: "absent" }

const anHour = 3600000

const wordCharacter = /[\p{L}\p{N}]/u

const valueUnder = (key: string, values: Values): Value => values.properties[key] ?? absent

const same = (one: Value, other: Value): boolean => {
  switch (one.kind) {
    case "absent":
      return other.kind === "absent"
    case "text":
      return other.kind === "text" && one.text === other.text
    case "number":
      return other.kind === "number" && one.number === other.number
    case "boolean":
      return other.kind === "boolean" && one.boolean === other.boolean
    case "instant":
      return other.kind === "instant" && one.instant === other.instant
    case "date":
      return other.kind === "date" && one.date === other.date
    case "list":
      return (
        other.kind === "list" &&
        one.of === other.of &&
        one.items.length === other.items.length &&
        one.items.every((item, index) => same(item, other.items[index] as Value))
      )
  }
}

const writtenOut = (value: Value): string | null => {
  if (value.kind === "text") return value.text
  if (value.kind === "boolean") return value.boolean ? "true" : "false"
  if (value.kind === "date") return value.date
  return null
}

const digitsOf = (value: Value): Value => {
  if (value.kind !== "number" || !Number.isInteger(value.number)) return absent
  return { kind: "text", text: BigInt(value.number).toString() }
}

const workText = (parts: readonly TextPart[], values: Values): Value => {
  let text = ""
  for (const part of parts) {
    if (part.part === "characters") {
      text += part.characters
      continue
    }
    const written = writtenOut(valueUnder(part.key, values))
    if (written === null) return absent
    text += written
  }
  return { kind: "text", text }
}

const numberFrom = (one: Value, other: Value, join: (a: number, b: number) => number): Value => {
  if (one.kind !== "number" || other.kind !== "number") return absent
  const answer = join(one.number, other.number)
  return Number.isFinite(answer) ? { kind: "number", number: answer } : absent
}

const orderFrom = (one: Value, other: Value, join: (a: number, b: number) => boolean): Value => {
  if (one.kind !== "number" || other.kind !== "number") return absent
  return { kind: "boolean", boolean: join(one.number, other.number) }
}

const workConjunction = (
  expression: Expression & { node: "operation" },
  left: Value,
  values: Values
): Value => {
  if (left.kind !== "boolean") return absent
  if (!left.boolean) return { kind: "boolean", boolean: false }
  const right = work(expression.right, values)
  return right.kind === "boolean" ? right : absent
}

const workOperation = (expression: Expression & { node: "operation" }, values: Values): Value => {
  const operator = expression.operator
  const left = work(expression.left, values)
  if (operator === "??") {
    return left.kind === "absent" ? work(expression.right, values) : left
  }
  if (operator === "&&") return workConjunction(expression, left, values)
  const right = work(expression.right, values)
  if (operator === "==") return { kind: "boolean", boolean: same(left, right) }
  if (operator === "!=") return { kind: "boolean", boolean: !same(left, right) }
  if (left.kind === "absent" || right.kind === "absent") return absent
  switch (operator) {
    case "+":
      return numberFrom(left, right, (a, b) => a + b)
    case "-":
      return numberFrom(left, right, (a, b) => a - b)
    case "*":
      return numberFrom(left, right, (a, b) => a * b)
    case "/":
      return numberFrom(left, right, (a, b) => a / b)
    case "<":
      return orderFrom(left, right, (a, b) => a < b)
    case "<=":
      return orderFrom(left, right, (a, b) => a <= b)
    case ">":
      return orderFrom(left, right, (a, b) => a > b)
    default:
      return orderFrom(left, right, (a, b) => a >= b)
  }
}

const holdsWord = (text: string, word: string): boolean => {
  if (word === "") return false
  const inText = text.toLowerCase()
  const inWord = word.toLowerCase()
  let from = 0
  for (;;) {
    const found = inText.indexOf(inWord, from)
    if (found === -1) return false
    const before = found === 0 ? "" : (inText[found - 1] as string)
    const after = inText[found + inWord.length] ?? ""
    if (!wordCharacter.test(before) && !wordCharacter.test(after)) return true
    from = found + 1
  }
}

const workCall = (expression: Expression & { node: "call" }, values: Values): Value => {
  if (expression.name === "now") return { kind: "instant", instant: values.now }
  const given = expression.arguments.map((argument) => work(argument, values))
  if (given.some((value) => value.kind === "absent")) return absent
  const [first, second] = given
  if (first === undefined) return absent
  if (expression.name === "text") return digitsOf(first)
  if (second === undefined) return absent
  if (expression.name === "hoursBetween") {
    if (first.kind !== "instant" || second.kind !== "instant") return absent
    const hours = Math.abs(second.instant - first.instant) / anHour
    return Number.isFinite(hours) ? { kind: "number", number: hours } : absent
  }
  if (expression.name === "contains") {
    if (first.kind !== "list") return absent
    return { kind: "boolean", boolean: first.items.some((item) => same(item, second)) }
  }
  if (expression.name === "hasWord") {
    if (first.kind !== "text" || second.kind !== "text") return absent
    return { kind: "boolean", boolean: holdsWord(first.text, second.text) }
  }
  return absent
}

const workCase = (expression: Expression & { node: "case" }, values: Values): Value => {
  for (const row of expression.rows) {
    const test = work(row.test, values)
    if (test.kind === "boolean" && test.boolean) return work(row.value, values)
  }
  return work(expression.otherwise, values)
}

const work = (expression: Expression, values: Values): Value => {
  switch (expression.node) {
    case "number":
      return { kind: "number", number: expression.number }
    case "boolean":
      return { kind: "boolean", boolean: expression.boolean }
    case "absent":
      return absent
    case "reference":
      return valueUnder(expression.key, values)
    case "negation": {
      const of = work(expression.of, values)
      return of.kind === "number" ? { kind: "number", number: -of.number } : absent
    }
    case "text":
      return workText(expression.parts, values)
    case "operation":
      return workOperation(expression, values)
    case "call":
      return workCall(expression, values)
    case "case":
      return workCase(expression, values)
  }
}

export const runTree = (tree: Expression, values: Values): Value => work(tree, values)
