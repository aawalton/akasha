import { describe, expect, test } from "bun:test"
import { pagesSeqName } from "./page-type-sequence-name"

describe("pagesSeqName", () => {
  test("folds a kebab-case slug to pages_seq_<snake>", () => {
    expect(pagesSeqName("project")).toBe("pages_seq_project")
    expect(pagesSeqName("temper-curse")).toBe("pages_seq_temper_curse")
    expect(pagesSeqName("audhdalan-subscriber")).toBe("pages_seq_audhdalan_subscriber")
  })

  test("rejects a slug containing an underscore (keeps the fold injective)", () => {
    expect(() => pagesSeqName("foo_bar")).toThrow(/underscore|injective|_/)
    expect(() => pagesSeqName("temper_curse")).toThrow()
  })

  test("rejects a slug whose derived name is not a safe pages_seq_* identifier", () => {
    expect(() => pagesSeqName("Bad")).toThrow(/not a safe/)
    expect(() => pagesSeqName("x; DROP TABLE")).toThrow(/not a safe/)
    expect(() => pagesSeqName("")).toThrow(/not a safe/)
  })
})
