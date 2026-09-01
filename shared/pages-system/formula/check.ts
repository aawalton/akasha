import type { DeclaredType, Refused, Shape, ValueType } from "./formula.ts"
import { refuse } from "./refused.ts"
import type { Expression, Operator } from "./tree.ts"

export type Typed = {
  readonly ok: true
  readonly type: ValueType
  readonly reads: readonly string[]
}

class CheckingRefused extends Error {
  readonly at: number

  constructor(at: number, why: string) {
    super(why)
    this.at = at
  }
}

const nameOf = (type: DeclaredType | null): string => {
  if (type === null) return "absent"
  return type.kind === "list" ? `list of ${type.of}` : type.kind
}

const an = (name: string): string => `${"aeiou".includes(name[0] ?? "") ? "an" : "a"} ${name}`

const written = (expression: Expression): string => {
  switch (expression.node) {
    case "reference":
      return `\`{${expression.key}}\``
    case "number":
      return `\`${expression.number}\``
    case "boolean":
      return `\`${expression.boolean}\``
    case "absent":
      return "`absent`"
    case "text":
      return "the text literal"
    case "call":
      return `what \`${expression.name}\` answers`
    case "case":
      return "what the case answers"
    case "negation":
      return "the negation"
    case "operation":
      return `what \`${expression.operator}\` answers`
  }
}

const sameType = (one: DeclaredType, other: DeclaredType): boolean => {
  if (one.kind === "list") return other.kind === "list" && one.of === other.of
  return one.kind === other.kind
}

const holding = (kind: DeclaredType["kind"], absent: boolean): ValueType => ({
  holds: { kind } as DeclaredType,
  absent,
})

const declaredType = (key: string, at: number, shape: Shape, reads: Set<string>): DeclaredType => {
  const declared = shape[key]
  if (declared === undefined) {
    throw new CheckingRefused(at, `no property is declared under the key \`${key}\``)
  }
  reads.add(key)
  return declared
}

const needs = (
  type: ValueType,
  kind: DeclaredType["kind"],
  where: Expression,
  said: string
): void => {
  if (type.holds === null || type.holds.kind === kind) return
  throw new CheckingRefused(
    where.at,
    `${written(where)} holds ${an(nameOf(type.holds))}, and ${said} takes ${an(kind)}`
  )
}

const meet = (
  left: ValueType,
  right: ValueType,
  onLeft: Expression,
  onRight: Expression,
  at: number,
  said: string
): void => {
  if (left.holds === null || right.holds === null) return
  if (sameType(left.holds, right.holds)) return
  throw new CheckingRefused(
    at,
    `${written(onLeft)} holds ${an(nameOf(left.holds))} while ${written(onRight)} holds ${an(nameOf(right.holds))}, and ${said}`
  )
}

const notAnInstant = (type: ValueType, where: Expression, operator: Operator): void => {
  if (type.holds === null || type.holds.kind !== "instant") return
  throw new CheckingRefused(
    where.at,
    `${written(where)} holds an instant, which is read only by a function taking one, and \`${operator}\` is an operator`
  )
}

const typeOfText = (
  expression: Expression & { node: "text" },
  shape: Shape,
  reads: Set<string>
): ValueType => {
  let absent = false
  for (const part of expression.parts) {
    if (part.part !== "reference") continue
    const declared = declaredType(part.key, part.at, shape, reads)
    if (declared.kind === "list") {
      throw new CheckingRefused(
        part.at,
        `\`${part.key}\` holds a ${nameOf(declared)}, and a list cannot be written into a text literal`
      )
    }
    if (declared.kind === "instant") {
      throw new CheckingRefused(
        part.at,
        `\`${part.key}\` holds an instant, which is read only by a function taking one`
      )
    }
    if (declared.kind === "number") {
      throw new CheckingRefused(
        part.at,
        `\`${part.key}\` holds a number, which a text literal does not write; a key computed \`text({${part.key}})\` does`
      )
    }
    absent = true
  }
  return holding("text", absent)
}

const typeOfOperation = (
  expression: Expression & { node: "operation" },
  shape: Shape,
  reads: Set<string>
): ValueType => {
  const operator = expression.operator
  const left = typeOf(expression.left, shape, reads)
  const right = typeOf(expression.right, shape, reads)
  const said = `\`${operator}\``
  notAnInstant(left, expression.left, operator)
  notAnInstant(right, expression.right, operator)
  if (operator === "+" || operator === "-" || operator === "*" || operator === "/") {
    needs(left, "number", expression.left, `the left of ${said}`)
    needs(right, "number", expression.right, `the right of ${said}`)
    return holding("number", left.absent || right.absent || operator === "/")
  }
  if (operator === "<" || operator === "<=" || operator === ">" || operator === ">=") {
    needs(left, "number", expression.left, `the left of ${said}`)
    needs(right, "number", expression.right, `the right of ${said}`)
    return holding("boolean", left.absent || right.absent)
  }
  if (operator === "==" || operator === "!=") {
    meet(
      left,
      right,
      expression.left,
      expression.right,
      expression.at,
      `${said} compares two values of one kind`
    )
    return holding("boolean", false)
  }
  if (operator === "&&") {
    needs(left, "boolean", expression.left, `the left of ${said}`)
    needs(right, "boolean", expression.right, `the right of ${said}`)
    return holding("boolean", left.absent || right.absent)
  }
  meet(
    left,
    right,
    expression.left,
    expression.right,
    expression.at,
    `${said} answers its left or its right, which are of one kind`
  )
  return { holds: left.holds ?? right.holds, absent: left.absent && right.absent }
}

const takesArguments = (
  expression: Expression & { node: "call" },
  count: number
): readonly Expression[] => {
  if (expression.arguments.length === count) return expression.arguments
  const many = count === 1 ? "1 argument" : `${count} arguments`
  throw new CheckingRefused(
    expression.at,
    `\`${expression.name}\` takes ${many}, and it was given ${expression.arguments.length}`
  )
}

const typeOfCall = (
  expression: Expression & { node: "call" },
  shape: Shape,
  reads: Set<string>
): ValueType => {
  const name = expression.name
  if (name === "now") {
    takesArguments(expression, 0)
    return holding("instant", false)
  }
  if (name === "text") {
    const given = takesArguments(expression, 1)
    const only = given[0] as Expression
    needs(typeOf(only, shape, reads), "number", only, "the argument of `text`")
    return holding("text", true)
  }
  if (name === "hoursBetween" || name === "contains" || name === "hasWord") {
    const given = takesArguments(expression, 2)
    const first = typeOf(given[0] as Expression, shape, reads)
    const second = typeOf(given[1] as Expression, shape, reads)
    const absent = first.absent || second.absent
    const onFirst = given[0] as Expression
    const onSecond = given[1] as Expression
    if (name === "hoursBetween") {
      needs(first, "instant", onFirst, "the first argument of `hoursBetween`")
      needs(second, "instant", onSecond, "the second argument of `hoursBetween`")
      return holding("number", absent)
    }
    if (name === "hasWord") {
      needs(first, "text", onFirst, "the first argument of `hasWord`")
      needs(second, "text", onSecond, "the second argument of `hasWord`")
      return holding("boolean", absent)
    }
    if (first.holds !== null && first.holds.kind !== "list") {
      throw new CheckingRefused(
        onFirst.at,
        `${written(onFirst)} holds ${an(nameOf(first.holds))}, and \`contains\` asks whether a list holds a value`
      )
    }
    if (first.holds !== null && first.holds.kind === "list" && second.holds !== null) {
      if (second.holds.kind !== first.holds.of) {
        throw new CheckingRefused(
          onSecond.at,
          `${written(onSecond)} holds ${an(nameOf(second.holds))}, and \`contains\` looks in ${written(onFirst)}, ${an(nameOf(first.holds))}, for ${an(first.holds.of)}`
        )
      }
    }
    return holding("boolean", absent)
  }
  throw new CheckingRefused(
    expression.at,
    `no function is named \`${name}\`; the functions are \`now\`, \`hoursBetween\`, \`contains\`, \`hasWord\` and \`text\``
  )
}

const typeOfCase = (
  expression: Expression & { node: "case" },
  shape: Shape,
  reads: Set<string>
): ValueType => {
  let holds: DeclaredType | null = null
  let absent = false
  const answers = (value: ValueType, where: Expression): void => {
    absent = absent || value.absent
    if (value.holds === null) return
    if (holds === null) {
      holds = value.holds
      return
    }
    if (sameType(holds, value.holds)) return
    throw new CheckingRefused(
      where.at,
      `${written(where)} holds ${an(nameOf(value.holds))} while an earlier row of the case holds ${an(nameOf(holds))}, and a case answers one kind of value`
    )
  }
  for (const row of expression.rows) {
    const test = typeOf(row.test, shape, reads)
    if (test.holds !== null && test.holds.kind !== "boolean") {
      throw new CheckingRefused(
        row.test.at,
        `${written(row.test)} holds ${an(nameOf(test.holds))}, and a case row matches only where its test answers true`
      )
    }
    answers(typeOf(row.value, shape, reads), row.value)
  }
  answers(typeOf(expression.otherwise, shape, reads), expression.otherwise)
  return { holds, absent }
}

const typeOf = (expression: Expression, shape: Shape, reads: Set<string>): ValueType => {
  switch (expression.node) {
    case "number":
      return holding("number", false)
    case "boolean":
      return holding("boolean", false)
    case "absent":
      return { holds: null, absent: true }
    case "text":
      return typeOfText(expression, shape, reads)
    case "reference":
      return { holds: declaredType(expression.key, expression.at, shape, reads), absent: true }
    case "negation": {
      const of = typeOf(expression.of, shape, reads)
      notAnInstant(of, expression.of, "-")
      needs(of, "number", expression.of, "a negation")
      return holding("number", of.absent)
    }
    case "operation":
      return typeOfOperation(expression, shape, reads)
    case "call":
      return typeOfCall(expression, shape, reads)
    case "case":
      return typeOfCase(expression, shape, reads)
  }
}

export const checkTree = (tree: Expression, shape: Shape, source: string): Typed | Refused => {
  const reads = new Set<string>()
  try {
    const type = typeOf(tree, shape, reads)
    return { ok: true, type, reads: [...reads] }
  } catch (thrown) {
    if (thrown instanceof CheckingRefused) {
      return refuse("checking", source, thrown.at, thrown.message)
    }
    throw thrown
  }
}

export const otherKindThanDeclared = (
  key: string,
  answers: ValueType,
  declared: DeclaredType
): string | null => {
  if (answers.holds === null || sameType(answers.holds, declared)) return null
  return `\`${key}\` is declared ${an(nameOf(declared))}, and its formula answers ${an(nameOf(answers.holds))}`
}

export const cycleAmong = (ring: readonly string[]): string =>
  `a cycle among the formulas of ${ring.map((key) => `\`${key}\``).join(", ")}`

export const ringAmong = (
  reads: ReadonlyMap<string, readonly string[]>
): readonly string[] | null => {
  const open: string[] = []
  const shut = new Set<string>()
  const walk = (key: string): readonly string[] | null => {
    const standing = open.indexOf(key)
    if (standing !== -1) return open.slice(standing)
    if (shut.has(key)) return null
    const named = reads.get(key)
    if (named === undefined) return null
    open.push(key)
    for (const read of named) {
      const ring = walk(read)
      if (ring !== null) return ring
    }
    open.pop()
    shut.add(key)
    return null
  }
  for (const key of reads.keys()) {
    const ring = walk(key)
    if (ring !== null) return ring
  }
  return null
}
