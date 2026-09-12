import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  ACTIVE,
  COUNT,
  DASH,
  DRY_RUN,
  EACH_STATING,
  FROM,
  LIMIT,
  LIMIT_PAGE,
  NAMING_NONE,
  NAMING_NOT_WITH,
  NAMING_ONE_OF,
  NAMING_TAIL,
  NAMING_THEM,
  NAMING_WORD,
  NODE,
  ONE_OF_THEM,
  ONE_OF_THREE,
  ONE_OF_TWO,
  ONTO,
  PAGES,
  PLACED,
  REST,
  refusals,
  SEAT_PAGE,
  SLUG,
  TAIL_PAGE,
  TO,
  taken,
  WORD_AND_FLAG,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"

test("an argument carrying no value is true where it is said and false where it is not", () => {
  expect(taken(["--dry-run"], [DRY_RUN])).toEqual({ dryRun: true })
  expect(taken([], [DRY_RUN])).toEqual({ dryRun: false })
})

test("a whole number is read as a number", () => {
  expect(taken(["--limit", "5"], [LIMIT])).toEqual({ limit: 5 })
})

test("true or false is read as true or false", () => {
  expect(taken(["--active", "false"], [ACTIVE])).toEqual({ active: false })
})

test("a repeating argument gathers its values in the order the values are said", () => {
  expect(taken(["--to", "a", "--to", "b"], [TO])).toEqual({ to: ["a", "b"] })
})

test("a repeating argument nothing said is an empty list", () => {
  expect(taken([], [TO])).toEqual({ to: [] })
})

test("an argument's key is its slug written in camel", () => {
  expect(Object.keys(taken(["--dry-run"], [DRY_RUN]))).toEqual(["dryRun"])
})

test("an argument no page names is refused, and the refusal names what the command takes", () => {
  expect(refusals(["--nope"], [DRY_RUN])[0]).toBe(
    "`--nope` is no argument `akasha thing` takes — it takes `--dry-run`"
  )
})

test("a command naming no argument refuses every word", () => {
  expect(refusals(["--nope"], [])[0]).toBe(
    "`--nope` is no argument `akasha thing` takes, and it takes none"
  )
})

test("an argument whose value is another argument is an argument no value follows", () => {
  expect(refusals(["--limit", "--dry-run"], [LIMIT, DRY_RUN])[0]).toBe(
    "`--limit` takes a value, and none follows it"
  )
})

test("a flag the command takes no argument at is refused rather than filling the one before it", () => {
  expect(refusals(["--limit", "--nope"], [LIMIT])).toEqual([
    "`--limit` takes a value, and none follows it",
    "`--nope` is no argument `akasha thing` takes — it takes `--limit`",
  ])
})

test("a value opening with one dash is a value rather than a flag", () => {
  expect(taken(["--node", "-5"], [NODE])).toEqual({ node: "-5" })
})

test("a value that is one dash is a value, which is how a call names what is piped in", () => {
  expect(taken(["--node", "-"], [NODE])).toEqual({ node: "-" })
})

test("an argument the command names where a value goes is refused whatever it is spelled", () => {
  expect(refusals(["--limit", "-s"], [LIMIT, DASH])[0]).toBe(
    "`--limit` takes a value, and none follows it"
  )
})

test("an argument that does not repeat is refused where one call says it twice", () => {
  expect(refusals(["--limit", "1", "--limit", "2"], [LIMIT])[0]).toBe(
    "`--limit` is said twice, and one call says it once"
  )
  expect(refusals(["--dry-run", "--dry-run"], [DRY_RUN])[0]).toBe(
    "`--dry-run` is said twice, and one call says it once"
  )
})

test("a value that is neither true nor false is refused", () => {
  expect(refusals(["--active", "yes"], [ACTIVE])[0]).toBe(
    "`--active` takes `true` or `false`, and `yes` is neither"
  )
})

test("a value that will not narrow is refused for the value alone, named as the call said it", () => {
  expect(refusals(["--limit", "many"], [{ ...LIMIT, required: true }])).toEqual([
    "`--limit many` is no whole number of nought or more",
  ])
  expect(refusals(["many"], [{ ...COUNT, required: true }])).toEqual([
    "`<count> many` is no whole number of nought or more",
  ])
  expect(refusals(["--limit", "9999999999999999"], [LIMIT])[0]).toBe(
    "`--limit 9999999999999999` is past the largest whole number that can be read"
  )
})

test("a value is read whole, so the spaces around it are the value's own", () => {
  expect(taken(["--node", " padded "], [NODE])).toEqual({ node: " padded " })
})

test("an argument the command needs and nothing said is refused, named every way it is said", () => {
  expect(refusals([], [{ ...LIMIT, required: true }])[0]).toBe(
    "`akasha thing` takes `--limit`, and nothing said it"
  )
  expect(refusals([], [{ ...NODE, required: true }])[0]).toBe(
    "`akasha thing` takes `<node>` or `--node`, and nothing said it"
  )
})

test("an argument the command needs is not refused where the call says it", () => {
  expect(taken(["--limit", "3"], [{ ...LIMIT, required: true }])).toEqual({ limit: 3 })
})

test("every refusal a call earns is gathered rather than the first alone", () => {
  expect(refusals(["--nope", "--limit", "many"], [LIMIT])).toEqual([
    "`--nope` is no argument `akasha thing` takes — it takes `--limit`",
    "`--limit many` is no whole number of nought or more",
  ])
})

test("a word that is no flag fills the argument the command takes as a word", () => {
  expect(taken(["n1"], [NODE])).toEqual({ node: "n1" })
})

test("an argument taken as a word is taken at its flag too", () => {
  expect(taken(["--node", "n1"], [NODE])).toEqual({ node: "n1" })
})

test("an argument said as a word and at its flag in one call is refused", () => {
  expect(refusals(["n1", "--node", "n2"], [NODE])[0]).toBe(
    "`<node>` is said as a word and `--node` at its flag, and one call says it one way"
  )
})

test("a second word is refused where the command takes one word", () => {
  expect(refusals(["n1", "n2"], [NODE])[0]).toBe(
    "`akasha thing` takes 1 word and this call says 2 words"
  )
})

test("two words fill the two word arguments in the order the command names them", () => {
  expect(taken(["here", "there"], [FROM, ONTO])).toEqual({ from: "here", onto: "there" })
})

test("three words fill the three word arguments in the order the command names them", () => {
  expect(taken(["here", "said", "there"], [FROM, SLUG, ONTO])).toEqual({
    from: "here",
    slug: "said",
    onto: "there",
  })
})

test("a call saying fewer words than the command takes is refused by the one left unsaid", () => {
  expect(refusals(["here"], [FROM, { ...ONTO, required: true }])[0]).toBe(
    "`akasha thing` takes `<onto>`, and nothing said it"
  )
})

test("a call saying more words than the command takes says how many either side is", () => {
  expect(refusals(["here", "there", "spare"], [FROM, ONTO])[0]).toBe(
    "`akasha thing` takes 2 words and this call says 3 words"
  )
})

test("a repeating word argument takes every word from its own place on", () => {
  expect(taken(["here", "one", "two"], [FROM, REST])).toEqual({
    from: "here",
    rest: ["one", "two"],
  })
})

test("every word after a bare double dash is a word, including another double dash", () => {
  expect(taken(["--", "--json"], [NODE])).toEqual({ node: "--json" })
  expect(taken(["--", "--"], [NODE])).toEqual({ node: "--" })
})

test("words after a bare double dash fill the word arguments in the order they are named", () => {
  expect(taken(["--", "here", "there"], [FROM, ONTO])).toEqual({ from: "here", onto: "there" })
})

test("an argument said with an equals carries what follows the first equals", () => {
  expect(taken(["--node=n1"], [NODE])).toEqual({ node: "n1" })
  expect(taken(["--limit=5"], [LIMIT])).toEqual({ limit: 5 })
})

test("a value written after the equals keeps every equals in it", () => {
  expect(taken(["--node=a=b"], [NODE])).toEqual({ node: "a=b" })
})

test("a value opening with two dashes is handed to a flag written with an equals", () => {
  expect(taken(["--node=--weird"], [NODE])).toEqual({ node: "--weird" })
})

test("a flag written with an equals and nothing after it is refused", () => {
  expect(refusals(["--node="], [NODE])[0]).toBe("`--node` takes a value, and `--node=` names none")
})

test("an argument carrying no value is refused where a call writes an equals after it", () => {
  expect(refusals(["--dry-run=yes"], [DRY_RUN])[0]).toBe(
    "`--dry-run` carries no value, and `--dry-run=yes` names one"
  )
})

test("an equals after a flag the command takes no argument at is refused whole", () => {
  expect(refusals(["--nope=1"], [LIMIT])[0]).toBe(
    "`--nope=1` is no argument `akasha thing` takes — it takes `--limit`"
  )
})

test("a word said after a bare double dash keeps an equals in it", () => {
  expect(taken(["--", "--node=n1"], [NODE])).toEqual({ node: "--node=n1" })
})

test("a word that is no flag keeps an equals in it", () => {
  expect(taken(["a=b"], [NODE])).toEqual({ node: "a=b" })
})

test("a word spelled as a flag is refused rather than filling an argument", () => {
  expect(refusals(["--nope"], [NODE])[0]).toBe(
    "`--nope` is no argument `akasha thing` takes — it takes `<node>`, `--node`"
  )
})

test("a word fills an argument the command needs", () => {
  expect(taken(["n1"], [{ ...NODE, required: true }])).toEqual({ node: "n1" })
})

test("a word is refused where the command takes no argument as a word", () => {
  expect(refusals(["n1"], [LIMIT])[0]).toBe(
    "`n1` is no argument `akasha thing` takes — it takes `--limit`"
  )
})

test("two arguments one call may not say together are refused where a call says both", () => {
  expect(refusals(["--video", "a.mp4", "--frames-dir", "frames"], ONE_OF_THEM)[0]).toBe(
    "`--video` and `--frames-dir` are never said together, and this call says both"
  )
})

test("two arguments one call may not say together are read where a call says one", () => {
  expect(taken(["--video", "a.mp4"], ONE_OF_THEM)).toEqual({ video: "a.mp4" })
})

test("a pair both entries state is refused once", () => {
  expect(refusals(["--video", "a.mp4", "--frames-dir", "frames"], EACH_STATING)).toEqual([
    "`--video` and `--frames-dir` are never said together, and this call says both",
  ])
})

test("a group one call must say one of is refused where a call says none of them", () => {
  expect(refusals([], ONE_OF_TWO)).toEqual([
    "`akasha thing` takes `--video` or `--frames-dir`, and nothing said either",
  ])
})

test("a group one call must say one of is read where a call says one", () => {
  expect(taken(["--video", "a.mp4"], ONE_OF_TWO)).toEqual({ video: "a.mp4" })
})

test("arguments naming each other that way are one group rather than pairs", () => {
  expect(refusals([], ONE_OF_THREE)).toEqual([
    "`akasha thing` takes `--to-position`, `--before` or `--after`, and nothing said any of them",
  ])
})

test("any one of a group answers for the whole group", () => {
  expect(taken(["--before", "x"], ONE_OF_THREE)).toEqual({ before: "x" })
})

test("a value that will not narrow still answers for the group it is in", () => {
  expect(refusals(["--to-position", "abc"], ONE_OF_THREE)).toEqual([
    "`--to-position abc` is no whole number of nought or more",
  ])
})

test("a command page's group is read from the entries that page states", () => {
  const read = takenFor([], "akasha thing", NAMING_ONE_OF, [SEAT_PAGE, LIMIT_PAGE])
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  expect(read.refused).toEqual([
    "`akasha thing` takes `--seat` or `--limit`, and nothing said either",
  ])
})

test("an argument said as a word alone is filled by a word", () => {
  expect(taken(["one"], [SLUG])).toEqual({ slug: "one" })
})

test("an argument said as a word alone is not taken at a flag", () => {
  expect(refusals(["--slug", "one"], [SLUG])[0]).toBe(
    "`--slug` is no argument `akasha thing` takes — it takes `<slug>`"
  )
})

test("an argument said as a word alone is named as a word where the command needs it", () => {
  expect(refusals([], [{ ...SLUG, required: true }])[0]).toBe(
    "`akasha thing` takes `<slug>`, and nothing said it"
  )
})

test("an argument said as a word alone is named by the placeholder it states", () => {
  expect(refusals([], [PLACED])[0]).toBe("`akasha thing` takes `<id>`, and nothing said it")
})

test("a command page's entries are read against the argument pages its code names", () => {
  const read = takenFor(["--seat", "athena"], "akasha thing", NAMING_THEM, PAGES)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken).toEqual({ seat: "athena", dryRun: false, to: [] })
})

test("what a command page names is answered under those keys and typed as the pages say", () => {
  const read = takenFor(["--seat", "athena", "--limit", "2"], "akasha thing", NAMING_THEM, PAGES)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  const seat: string = read.taken.seat
  const dry: boolean = read.taken.dryRun
  const limit: number | undefined = read.taken.limit
  const to: readonly string[] = read.taken.to
  expect([seat, dry, limit, to]).toEqual(["athena", false, 2, []])
})

test("an argument the command page needs is refused where nothing said it", () => {
  const read = takenFor([], "akasha thing", NAMING_THEM, PAGES)
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  expect(read.refused[0]).toBe("`akasha thing` takes `--seat`, and nothing said it")
})

test("how a command page says a call fills an argument is carried to the reader", () => {
  const read = takenFor(["athena"], "akasha thing", NAMING_WORD, [SEAT_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken.seat).toBe("athena")
})

test("two arguments a command page says are never said together are refused", () => {
  const read = takenFor(["--seat", "a", "--limit", "1"], "akasha thing", NAMING_NOT_WITH, [
    SEAT_PAGE,
    LIMIT_PAGE,
  ])
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  expect(read.refused[0]).toBe(
    "`--seat` and `--limit` are never said together, and this call says both"
  )
})

test("a command page naming no argument is answered with nothing taken", () => {
  const read = takenFor([], "akasha thing", NAMING_NONE, [])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken).toEqual({})
})

test("an argument page carrying a default is answered with it where no call says it", () => {
  const read = takenFor([], "akasha thing", NAMING_TAIL, [TAIL_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  const tail: number = read.taken.tail
  expect(tail).toBe(100)
})

test("a call saying an argument takes that value over the default", () => {
  const read = takenFor(["--tail", "7"], "akasha thing", NAMING_TAIL, [TAIL_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken.tail).toBe(7)
})

test("a word argument and a flag argument may not be said together", () => {
  expect(refusals(["a1", "--state", "working"], WORD_AND_FLAG)[0]).toBe(
    "`<agent-id>` and `--state` are never said together, and this call says both"
  )
})
