import { expect, test } from "bun:test"
import { checkTree } from "./check.ts"
import type { Refused, Shape, ValueType } from "./formula.ts"
import { readFormula } from "./read.ts"
import type { Expression } from "./tree.ts"

const shape: Shape = {
  title: { kind: "text" },
  points: { kind: "number" },
  settled: { kind: "boolean" },
  due: { kind: "instant" },
  day: { kind: "date" },
  tags: { kind: "list", of: "text" },
  sizes: { kind: "list", of: "number" },
}

const read = (source: string): Expression => {
  const tree = readFormula(source)
  if (!("node" in tree)) throw new Error(`refused while reading: ${tree.message}`)
  return tree
}

const typeOf = (source: string): ValueType => {
  const typed = checkTree(read(source), shape, source)
  if (!typed.ok) throw new Error(`refused while checking: ${typed.message}`)
  return typed.type
}

const refusal = (source: string): Refused => {
  const typed = checkTree(read(source), shape, source)
  if (typed.ok) throw new Error("it passed its check, and a refusal was expected")
  return typed
}

const readsOf = (source: string): readonly string[] => {
  const typed = checkTree(read(source), shape, source)
  if (!typed.ok) throw new Error(`refused while checking: ${typed.message}`)
  return typed.reads
}

test("a literal holds its own kind and is never absent", () => {
  expect(typeOf("1")).toEqual({ holds: { kind: "number" }, absent: false })
  expect(typeOf("true")).toEqual({ holds: { kind: "boolean" }, absent: false })
  expect(typeOf('"x"')).toEqual({ holds: { kind: "text" }, absent: false })
})

test("the word absent holds nothing and is always absent", () => {
  expect(typeOf("absent")).toEqual({ holds: null, absent: true })
})

test("a reference holds what the shape declares, and can always be absent", () => {
  expect(typeOf("{points}")).toEqual({ holds: { kind: "number" }, absent: true })
  expect(typeOf("{tags}")).toEqual({ holds: { kind: "list", of: "text" }, absent: true })
})

test("a formula naming a key the shape does not declare is refused, naming the key", () => {
  const said = refusal("{nowhere}")
  expect(said.moment).toBe("checking")
  expect(said.message).toContain("`nowhere`")
})

test("a checked formula reports every key it names, once each", () => {
  expect(readsOf("{points} + {points}")).toEqual(["points"])
  expect([...readsOf('"{title}" ?? "x"')].sort()).toEqual(["title"])
  expect([...readsOf("case({settled} -> {points}, otherwise -> 0)")].sort()).toEqual([
    "points",
    "settled",
  ])
})

test("arithmetic takes numbers on both sides", () => {
  expect(typeOf("{points} + 1")).toEqual({ holds: { kind: "number" }, absent: true })
  expect(refusal("{title} + 1").message).toContain("takes a number")
})

test("division can always answer absent, since dividing by zero does", () => {
  expect(typeOf("4 / 2")).toEqual({ holds: { kind: "number" }, absent: true })
  expect(typeOf("4 * 2")).toEqual({ holds: { kind: "number" }, absent: false })
})

test("a comparison takes numbers and answers a boolean", () => {
  expect(typeOf("{points} < 3")).toEqual({ holds: { kind: "boolean" }, absent: true })
  expect(refusal('{title} < "a"').message).toContain("takes a number")
})

test("equality answers a boolean and is never absent", () => {
  expect(typeOf("{points} == 1")).toEqual({ holds: { kind: "boolean" }, absent: false })
  expect(typeOf("{title} != absent")).toEqual({ holds: { kind: "boolean" }, absent: false })
})

test("equality across two kinds is refused, the types not meeting", () => {
  expect(refusal('{points} == "1"').message).toContain("one kind")
})

test("the conjunction takes booleans on both sides", () => {
  expect(typeOf("{settled} && true")).toEqual({ holds: { kind: "boolean" }, absent: true })
  expect(refusal("{points} && true").message).toContain("takes a boolean")
})

test("the fallback answers its kind, and is absent only where both sides are", () => {
  expect(typeOf("{points} ?? 0")).toEqual({ holds: { kind: "number" }, absent: false })
  expect(typeOf("{points} ?? {points}")).toEqual({ holds: { kind: "number" }, absent: true })
  expect(typeOf("absent ?? 1")).toEqual({ holds: { kind: "number" }, absent: false })
})

test("a fallback between two kinds is refused", () => {
  expect(refusal('{points} ?? "none"').message).toContain("one kind")
})

test("an instant is read only by a function taking one, never by an operator", () => {
  expect(refusal("{due} < {due}").message).toContain("only by a function taking one")
  expect(refusal("{due} == {due}").message).toContain("only by a function taking one")
  expect(refusal("{due} ?? {due}").message).toContain("only by a function taking one")
})

test("hoursBetween takes two instants and answers a number", () => {
  expect(typeOf("hoursBetween(now(), {due})")).toEqual({
    holds: { kind: "number" },
    absent: true,
  })
  expect(typeOf("hoursBetween(now(), now())")).toEqual({
    holds: { kind: "number" },
    absent: false,
  })
  expect(refusal("hoursBetween(now(), 1)").message).toContain("takes an instant")
})

test("now takes no argument and answers an instant", () => {
  expect(typeOf("now()")).toEqual({ holds: { kind: "instant" }, absent: false })
  expect(refusal("now(1)").message).toContain("takes 0 arguments")
})

test("contains looks in a list for a value of the list's kind", () => {
  expect(typeOf('contains({tags}, "urgent")')).toEqual({
    holds: { kind: "boolean" },
    absent: true,
  })
  expect(refusal('contains({sizes}, "urgent")').message).toContain("list of number")
  expect(refusal('contains({title}, "a")').message).toContain("asks whether a list holds a value")
})

test("hasWord takes two texts and answers a boolean", () => {
  expect(typeOf('hasWord({title}, "done")')).toEqual({
    holds: { kind: "boolean" },
    absent: true,
  })
  expect(refusal("hasWord({title}, 1)").message).toContain("takes a text")
})

test("a call given the wrong number of arguments is refused", () => {
  expect(refusal("hasWord({title})").message).toContain("takes 2 arguments, and it was given 1")
})

test("a function nothing names is refused, naming the functions there are", () => {
  expect(refusal("upper({title})").message).toContain("no function is named `upper`")
})

test("a case answers the one kind all its rows hold", () => {
  expect(typeOf("case({settled} -> 1, otherwise -> 2)")).toEqual({
    holds: { kind: "number" },
    absent: false,
  })
})

test("a case is absent where any row it could answer is", () => {
  expect(typeOf("case({settled} -> {points}, otherwise -> 0)")).toEqual({
    holds: { kind: "number" },
    absent: true,
  })
  expect(typeOf("case({settled} -> 1, otherwise -> absent)")).toEqual({
    holds: { kind: "number" },
    absent: true,
  })
})

test("a case whose rows hold two kinds is refused", () => {
  expect(refusal('case({settled} -> 1, otherwise -> "none")').message).toContain(
    "a case answers one kind of value"
  )
})

test("a case row's test must hold a boolean", () => {
  expect(refusal("case({points} -> 1, otherwise -> 2)").message).toContain(
    "a case row matches only where its test answers true"
  )
})

test("a refusal names the value the formula wrote, not the step that broke over it", () => {
  expect(refusal("{title} + 1").message).toContain("{title}")
  expect(refusal("{due} + 1").message).toContain("{due}")
  expect(refusal('contains({title}, "a")').message).toContain("{title}")
})

test("a negation takes a number", () => {
  expect(typeOf("-{points}")).toEqual({ holds: { kind: "number" }, absent: true })
  expect(refusal("-{title}").message).toContain("{title}")
})

test("a text literal holding a reference can be absent, and one holding none cannot", () => {
  expect(typeOf('"{title} is it"')).toEqual({ holds: { kind: "text" }, absent: true })
  expect(typeOf('"is it"')).toEqual({ holds: { kind: "text" }, absent: false })
})

test("a boolean may be written into a text literal, and a number may not", () => {
  expect(typeOf('"settled: {settled}"')).toEqual({ holds: { kind: "text" }, absent: true })
  expect(refusal('"{points} points"').message).toContain("a text literal does not write")
})

test("a list cannot be written into a text literal", () => {
  expect(refusal('"{tags}"').message).toContain("a list cannot be written into a text literal")
})

test("an instant cannot be written into a text literal", () => {
  expect(refusal('"{due}"').message).toContain("only by a function taking one")
})

test("a date can be written into a text literal, having one spelling and no other", () => {
  expect(typeOf('"on {day}"')).toEqual({ holds: { kind: "text" }, absent: true })
})

test("a date is refused wherever a number or an instant is wanted", () => {
  for (const source of ["{day} < {day}", "{day} + 1", "{day} * 2", "-{day}"]) {
    expect(refusal(source).message).toContain("takes a number")
    expect(refusal(source).message).toContain("holds a date")
  }
  expect(refusal("hoursBetween({day}, {due})").message).toContain("takes an instant")
})

test("equality reaches two dates, which are two values of one kind", () => {
  expect(typeOf("{day} == {day}")).toEqual({ holds: { kind: "boolean" }, absent: false })
  expect(refusal("{day} == {title}").message).toContain("one kind")
})

test("text takes one number and answers a text that can always be absent", () => {
  expect(typeOf("text({points})")).toEqual({ holds: { kind: "text" }, absent: true })
  expect(typeOf("text(2)")).toEqual({ holds: { kind: "text" }, absent: true })
  expect(refusal("text({title})").message).toContain("takes a number")
  expect(refusal("text()").message).toContain("takes 1 argument")
})
