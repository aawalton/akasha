import { describe, expect, test } from "bun:test"
import { examineFilePopulation, type Population } from "../../../../tools/lib/check-workflow/population"
import { removalArm, shellArm } from "./tmpfs-scratch-arms.ts"

const readerRefusing =
  (unreadable: readonly string[]) =>
  (path: string): string => {
    if (unreadable.includes(path)) throw new Error(`EACCES: permission denied, open '${path}'`)
    return "mktemp -d /var/tmp/x"
  }

function shellPopulation(files: readonly string[], unreadable: readonly string[]): Population {
  return examineFilePopulation({
    files,
    unit: "shell files",
    membership: {
      kind: "enumerated",
      because:
        "the members are a literal spelled in this test, so there is no acquisition to come back short",
    },
    readFile: readerRefusing(unreadable),
    scan: () => [],
  }).population
}

describe("removalArm — never a zero over a population nobody enumerated", () => {
  test("it says the axis went unmeasured rather than reporting none pending", () => {
    const [claim] = removalArm()
    expect(claim).toBe("REMOVAL ARM — UNMEASURED")
  })

  test("it says what would have to be run to measure it", () => {
    expect(removalArm().join("\n")).toContain("counting what")
  })
})

describe("shellArm — the count carries what it was taken over", () => {
  test("a walk that opened every member says so on the count's own line", () => {
    const [claim] = shellArm({
      population: shellPopulation(["a.sh", "b.sh", "c.sh"], []),
      spelling: 2,
    })
    expect(claim).toContain("2 shell file(s) spell a tmpfs root")
    expect(claim).toContain("[over 3 of 3 shell files]")
  })

  test("nothing is appended when every member was opened", () => {
    const lines = shellArm({ population: shellPopulation(["a.sh"], []), spelling: 0 })
    expect(lines.some((l) => l.includes("NOT EXAMINED"))).toBe(false)
  })

  test("a member it could not open is stated on the count's own line", () => {
    const [claim] = shellArm({
      population: shellPopulation(["a.sh", "b.sh"], ["b.sh"]),
      spelling: 1,
    })
    expect(claim).toContain("[over 1 of 2 shell files — 1 could not be examined]")
  })

  test("and named below it, with what stopped the read", () => {
    const lines = shellArm({ population: shellPopulation(["a.sh", "b.sh"], ["b.sh"]), spelling: 1 })
    const shortfall = lines.filter((l) => l.includes("NOT EXAMINED") || l.includes("b.sh"))
    expect(shortfall).toHaveLength(2)
    expect(shortfall.join("\n")).toContain("EACCES")
  })

  test("an exact count and a floor do not read alike", () => {
    const exact = shellArm({ population: shellPopulation(["a.sh", "b.sh"], []), spelling: 1 })
    const floor = shellArm({ population: shellPopulation(["a.sh", "b.sh"], ["b.sh"]), spelling: 1 })
    expect(exact[0]).not.toBe(floor[0])
  })
})
