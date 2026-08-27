import { describe, expect, test } from "bun:test"
import {
  type CandidateOrderViolation,
  candidateOrderHeader,
  findCrateProbeViolations,
  findTsCandidateOrderViolations,
  scanRustSource,
} from "./eso-live-dir-candidate-order.ts"

const RUST_FN = "resolve_saved_vars_dir"
const TS_FILE = "temper/shared-foundation-misc-eso-paths--from-instructions/src/eso-paths.ts"
const RUST_FILE = "packages/temper/watcher-tray/src/tray.rs"
const CRATE = "packages/temper/watcher-tray"

const PROFILE = "C:/probe"
const ONEDRIVE_TS = `${PROFILE}/OneDrive/Documents/Elder Scrolls Online/live`
const PLAIN_TS = `${PROFILE}/Documents/Elder Scrolls Online/live`

const rustProbe = (fnName: string, oneDriveFirst: boolean): string => {
  const onedrive = `    let onedrive = user_profile.join("OneDrive").join(&eso_subpath);
    if onedrive.is_dir() {
        return Some(onedrive);
    }`
  const direct = `    let direct = user_profile.join(&eso_subpath);
    if direct.is_dir() {
        return Some(direct);
    }`
  return `pub fn ${fnName}() -> Option<PathBuf> {
    let user_profile = PathBuf::from(std::env::var_os("USERPROFILE")?);
    let eso_subpath: PathBuf = ["Documents", "Elder Scrolls Online", "live"].iter().collect();
${oneDriveFirst ? `${onedrive}\n${direct}` : `${direct}\n${onedrive}`}
    None
}
`
}

const scan = (source: string) =>
  scanRustSource({ rustFile: RUST_FILE, rustSource: source, rustFn: RUST_FN })

const ts = (candidates: readonly string[]) =>
  findTsCandidateOrderViolations({ tsCandidates: candidates, tsFile: TS_FILE, rustFn: RUST_FN })

const crate = (namedResolvers: number) =>
  findCrateProbeViolations({ namedResolvers, rustFn: RUST_FN, crateDir: CRATE, tsFile: TS_FILE })

const actOf = (message: string | undefined): string => (message ?? "").split("ACT:")[1] ?? ""

const finding = (verdict: CandidateOrderViolation["verdict"]): CandidateOrderViolation => ({
  file: RUST_FILE,
  message: "stand-in",
  verdict,
})

const headerOf = (violations: readonly CandidateOrderViolation[], examinedWhole = true): string =>
  candidateOrderHeader({ violations, examinedWhole })

describe("scanRustSource — the Rust mirror", () => {
  test("the real probe shape passes and is counted under its name", () => {
    const result = scan(rustProbe(RUST_FN, true))
    expect(result.violations).toEqual([])
    expect(result.namedResolvers).toBe(1)
    expect(result.resolvers).toBe(1)
  })

  test("REFUSES a probe that tries plain Documents before OneDrive", () => {
    expect(scan(rustProbe(RUST_FN, false)).violations).toHaveLength(1)
  })

  test("the order refusal sends the reader to the Rust file and not to the TS one", () => {
    const act = actOf(scan(rustProbe(RUST_FN, false)).violations[0]?.message)
    expect(act).toContain(RUST_FILE)
    expect(act).not.toContain(TS_FILE)
  })

  test("JUDGES a probe duplicated into a sibling under a different name", () => {
    const result = scan(rustProbe("resolve_saved_vars_dir_v2", false))
    expect(result.violations).toHaveLength(1)
    expect(result.violations[0]?.message).toContain("resolve_saved_vars_dir_v2")
    expect(result.namedResolvers).toBe(0)
  })

  test("a renamed probe is not silently re-verified under the old name", () => {
    const result = scan(rustProbe("resolve_saved_vars_dir_v2", true))
    expect(result.violations).toEqual([])
    expect(result.namedResolvers).toBe(0)
    expect(crate(result.namedResolvers)).toHaveLength(1)
  })

  test("REFUSES as UNVERIFIED a resolver whose candidate shape this parser cannot read", () => {
    const source = `fn ${RUST_FN}() -> Option<PathBuf> {
    let onedrive = user_profile.join("OneDrive").join(&eso_subpath);
    return Some(onedrive);
}
`
    const result = scan(source)
    expect(result.violations).toHaveLength(1)
    expect(result.violations[0]?.message).toContain("UNVERIFIED")
    expect(actOf(result.violations[0]?.message)).not.toBe("")
  })

  test("REFUSES a OneDrive literal standing outside every function body", () => {
    const source = `const ONEDRIVE: &str = "OneDrive";\n${rustProbe(RUST_FN, true)}`
    const result = scan(source)
    expect(result.violations).toHaveLength(1)
    expect(result.violations[0]?.message).toContain("UNVERIFIED")
  })

  test("a crate source with no probe in it contributes nothing either way", () => {
    const result = scan('fn log_line(msg: &str) {\n    println!("{}", msg);\n}\n')
    expect(result.violations).toEqual([])
    expect(result.resolvers).toBe(0)
  })
})

describe("findTsCandidateOrderViolations — the specification", () => {
  test("OneDrive at index 0 is the shape that passes", () => {
    expect(ts([ONEDRIVE_TS, PLAIN_TS])).toEqual([])
  })

  test("REFUSES the order that shipped the defect", () => {
    expect(ts([PLAIN_TS, ONEDRIVE_TS])).toHaveLength(1)
  })

  test("the TS refusal sends the reader to the TS file and not to the Rust one", () => {
    const act = actOf(ts([PLAIN_TS, ONEDRIVE_TS])[0]?.message)
    expect(act).toContain(TS_FILE)
    expect(act).not.toContain(RUST_FILE)
  })

  test("REFUSES as UNVERIFIED a win32 answer with no OneDrive branch at all", () => {
    const violations = ts([PLAIN_TS])
    expect(violations).toHaveLength(1)
    expect(violations[0]?.message).toContain("UNVERIFIED")
  })

  test("REFUSES more than one OneDrive candidate", () => {
    expect(ts([ONEDRIVE_TS, ONEDRIVE_TS, PLAIN_TS])).toHaveLength(1)
  })

  test("matches OneDrive as a path SEGMENT, not as a substring", () => {
    expect(ts([`${PROFILE}/OneDriveArchive/Documents`, PLAIN_TS])).toHaveLength(1)
  })
})

describe("findCrateProbeViolations — the claim no single file can make", () => {
  test("exactly one named probe in the crate is the shape that passes", () => {
    expect(crate(1)).toEqual([])
  })

  test("REFUSES as UNVERIFIED a crate holding no named probe, and names an act", () => {
    const violations = crate(0)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.message).toContain("UNVERIFIED")
    expect(actOf(violations[0]?.message)).not.toBe("")
  })

  test("REFUSES a crate holding two probes under the same name, and names an act", () => {
    const violations = crate(2)
    expect(violations).toHaveLength(1)
    expect(actOf(violations[0]?.message)).not.toBe("")
  })
})

describe("the verdict every refusal carries", () => {
  test("a refusal that COMPARED both orders is a disagreement", () => {
    expect(scan(rustProbe(RUST_FN, false)).violations[0]?.verdict).toBe("disagreement")
    expect(ts([PLAIN_TS, ONEDRIVE_TS])[0]?.verdict).toBe("disagreement")
  })

  test("a refusal that could not read a side is unverified", () => {
    const unreadableShape = `fn ${RUST_FN}() -> Option<PathBuf> {
    let onedrive = user_profile.join("OneDrive").join(&eso_subpath);
    return Some(onedrive);
}
`
    expect(scan(unreadableShape).violations[0]?.verdict).toBe("unverified")
    expect(scan(`const O: &str = "OneDrive";\n`).violations[0]?.verdict).toBe("unverified")
    expect(ts([PLAIN_TS])[0]?.verdict).toBe("unverified")
    expect(ts([ONEDRIVE_TS, ONEDRIVE_TS, PLAIN_TS])[0]?.verdict).toBe("unverified")
    expect(crate(0)[0]?.verdict).toBe("unverified")
    expect(crate(2)[0]?.verdict).toBe("unverified")
  })
})

describe("candidateOrderHeader — the first line of a failing run", () => {
  test("a run that compared both orders and found drift says drift", () => {
    expect(headerOf([finding("disagreement")])).toContain("drift")
  })

  test("a run that could not compare says UNVERIFIED, not drift", () => {
    const header = headerOf([finding("unverified")])
    expect(header).toContain("UNVERIFIED")
    expect(header).not.toContain("drift")
  })

  test("UNVERIFIED wins over drift when a run holds both", () => {
    const header = headerOf([finding("disagreement"), finding("unverified")])
    expect(header).toContain("UNVERIFIED")
    expect(header).not.toContain("drift")
  })

  test("a population that fell short is UNVERIFIED whatever its findings say", () => {
    expect(headerOf([finding("disagreement")], false)).toContain("UNVERIFIED")
  })

  test("the header counts the findings it heads", () => {
    expect(headerOf([finding("disagreement"), finding("disagreement")])).toContain("2")
  })
})
