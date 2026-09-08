import { describe, expect, test } from "bun:test"
import { resolveApp } from "../mobile-app/mobile-app.module.code.ts"
import {
  BUILD_NUMBER_MARKER_PREFIX,
  buildAcquireMacBuildLock,
  buildChooseBuildNumber,
  buildReleaseMacBuildLock,
  buildReserveBuildNumber,
  parseAssignedBuildNumber,
} from "./mac-build-serialization.module.code.ts"

const APP = resolveApp()
const MAC_BUILD_LOCK_DIR = APP.macBuildLockDir
const MAC_BUILD_NUMBER_FILE = APP.macBuildNumberFile

describe("parseAssignedBuildNumber", () => {
  test("extracts the number from the marker line", () => {
    const out = `regen…\n${BUILD_NUMBER_MARKER_PREFIX}58\n** ARCHIVE SUCCEEDED **`
    expect(parseAssignedBuildNumber(out)).toBe(58)
  })

  test("tolerates surrounding whitespace on the marker line", () => {
    expect(parseAssignedBuildNumber(`  ${BUILD_NUMBER_MARKER_PREFIX}7  `)).toBe(7)
  })

  test("last marker wins (a retry's number supersedes an earlier one)", () => {
    const out = `${BUILD_NUMBER_MARKER_PREFIX}12\n…retry…\n${BUILD_NUMBER_MARKER_PREFIX}13`
    expect(parseAssignedBuildNumber(out)).toBe(13)
  })

  test("absent marker → undefined", () => {
    expect(parseAssignedBuildNumber("no marker here\n** ARCHIVE SUCCEEDED **")).toBeUndefined()
  })

  test("a non-numeric / zero marker payload is ignored", () => {
    expect(parseAssignedBuildNumber(`${BUILD_NUMBER_MARKER_PREFIX}oops`)).toBeUndefined()
    expect(parseAssignedBuildNumber(`${BUILD_NUMBER_MARKER_PREFIX}0`)).toBeUndefined()
  })
})

describe("buildAcquireMacBuildLock", () => {
  const s = buildAcquireMacBuildLock(APP)

  test("acquires via atomic mkdir on the lock dir and records the pid", () => {
    expect(s).toContain(`mkdir "${MAC_BUILD_LOCK_DIR}"`)
    expect(s).toContain(`echo "$$" > "${MAC_BUILD_LOCK_DIR}/pid"`)
  })

  test("steals only a dead-pid lock that is also older than the stale-age guard", () => {
    expect(s).toContain('kill -0 "$_holder"')
    expect(s).toContain("stat -f %m")
    expect(s).toContain(`rm -rf "${MAC_BUILD_LOCK_DIR}"`)
  })

  test("never installs an EXIT trap (would clobber the signing keychain-restore trap)", () => {
    expect(s).not.toContain("trap")
  })

  test("fails loud with the CONCURRENT_BUILD_MUTATION sentinel on ceiling timeout", () => {
    expect(s).toContain("CONCURRENT_BUILD_MUTATION:")
    expect(s).toContain("exit 3")
  })

  test("polls with sleep while waiting (queueing, not busy-spinning)", () => {
    expect(s).toContain("sleep ")
  })
})

describe("buildReleaseMacBuildLock", () => {
  test("removes the lock dir (explicit success-path release, no trap)", () => {
    const s = buildReleaseMacBuildLock(APP)
    expect(s).toContain(`rm -rf "${MAC_BUILD_LOCK_DIR}"`)
    expect(s).not.toContain("trap")
  })
})

describe("buildChooseBuildNumber", () => {
  test("auto-choice computes next = max(localCounter, ascFloor) + 1 and echoes the marker", () => {
    const s = buildChooseBuildNumber({ app: APP, ascFloor: 57 })
    expect(s).toContain(`cat "${MAC_BUILD_NUMBER_FILE}"`)
    expect(s).toContain("_asc_floor=57")
    expect(s).toContain("BUILD_NUMBER=$(( _base + 1 ))")
    expect(s).toContain(`echo "${BUILD_NUMBER_MARKER_PREFIX}$BUILD_NUMBER"`)
  })

  test("choosing spends nothing: the durable counter is never written at choosing time", () => {
    const s = buildChooseBuildNumber({ app: APP, ascFloor: 57 })
    expect(s).not.toContain(`> "${MAC_BUILD_NUMBER_FILE}"`)
  })

  test("explicit --build-number is used verbatim and skips the arithmetic", () => {
    const s = buildChooseBuildNumber({ app: APP, explicit: 99, ascFloor: 40 })
    expect(s).toContain("BUILD_NUMBER=99")
    expect(s).not.toContain("_base + 1")
  })

  test("a non-numeric persisted counter is normalized to 0 before arithmetic", () => {
    const s = buildChooseBuildNumber({ app: APP, ascFloor: 0 })
    expect(s).toContain("*[!0-9]*) _counter=0")
  })
})

describe("buildReserveBuildNumber", () => {
  test("reserving advances the durable counter to the number the upload spent", () => {
    const s = buildReserveBuildNumber(APP)
    expect(s).toContain(`echo "$BUILD_NUMBER" > "${MAC_BUILD_NUMBER_FILE}"`)
    expect(s).toContain('if [ "$_reserved" -lt "$BUILD_NUMBER" ]; then')
  })

  test("a counter already at or past the number is left alone rather than lowered", () => {
    expect(buildReserveBuildNumber(APP)).toContain("left alone")
  })

  test("a non-numeric persisted counter is normalized to 0 before comparison", () => {
    expect(buildReserveBuildNumber(APP)).toContain("*[!0-9]*) _reserved=0")
  })
})
