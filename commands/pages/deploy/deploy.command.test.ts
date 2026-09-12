import { afterAll, expect, test } from "bun:test"
import {
  DATA,
  OK,
  OPERATIONAL,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { commitAt } from "akasha/commands/pages/deploy/commit-naming/deploy-commit-naming.module.code.ts"
import { recordedCommit } from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"
import type { PuttingUp, Wanted } from "akasha/commands/pages/deploy/deploy.command.code.ts"
import {
  deploy,
  saidOfUnproven,
  stoppedPartWay,
} from "akasha/commands/pages/deploy/deploy.command.code.ts"
import { committed, given } from "akasha/commands/pages/deploy/deploy.command.test-fixtures.ts"
import {
  seededWorld,
  WEB_APPS_AT,
} from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.test-fixtures.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

const HERE = given(committed(WORLD.root))

function pastTheChecks(): { readonly root: string; readonly commit: string } {
  const world = seededWorld()
  const root = committed(world.root)
  const commit = commitAt(root, null) as string
  recordedCommit(root, "one-web", `${WEB_APPS_AT}/one-web.web-app.ts`, commit)
  return { root, commit }
}

test("a call naming no app is refused as the caller's fault", async () => {
  const answer = await deploy([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("<slug>")
  expect(answer.refusals[0]).toContain("nothing said it")
})

test("a call naming two apps is refused rather than chosen between", async () => {
  const answer = await deploy(["one-web", "two-web"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("takes 1 word")
  expect(answer.refusals[0]).toContain("2 words")
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await deploy(["one-web", "--again"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--again`")
})

test("a deploy told to be measured is taken rather than refused as a flag it does not take", async () => {
  const answer = await deploy(["no-such-app-here", "--measured"], HERE)

  expect(answer.code).toBe(2)
})

test("a slug no app page of either kind carries is refused as the data's fault", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-app-here")
  expect(answer.refusals[0]).toContain("web app")
  expect(answer.refusals[0]).toContain("ios app")
})

test("a checkout whose checks will not load puts nothing up", async () => {
  const answer = await deploy(["two-web"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("the checks would not load")
  expect(answer.refusals[0]).toContain("two-web")
})

test("a refusal reaching no cluster reports nothing", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.report).toEqual([])
})

test("an ios app is handed to the build rather than refused as unbuilt", async () => {
  const answer = await deploy(["atlas", "--dry-run"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names an ios app")
  expect(answer.refusals[0]).toContain("--no-upload")
})

test("an ios app is found by the short slug its page states", async () => {
  const answer = await deploy(["atlas-ios", "--dry-run"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("atlas-ios")
})

test("a web app is refused the flag belonging to an ios app", async () => {
  const answer = await deploy(["one-web", "--no-upload"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names a web app")
  expect(answer.refusals[0]).toContain("--dry-run")
})

test("a web app takes a commit rather than being refused one", async () => {
  const answer = await deploy(["one-web", "--ref", "4f2a91c"], HERE)
  expect(answer.refusals[0]).not.toContain("says nothing about it")
})

test("a commit no checkout holds is refused by the name the call gave", async () => {
  const answer = await deploy(["one-web", "--ref", "4f2a91c"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("4f2a91c")
})

test("every ios app the mobile commands carry is reached by this command", async () => {
  for (const slug of ["alanwalton", "atlas", "smilingjenny"]) {
    const answer = await deploy([slug, "--dry-run"], HERE)
    expect(answer.refusals[0]).toContain("names an ios app")
  }
})

test("a commit named is taken off the call rather than read as a second app", async () => {
  const answer = await deploy(["atlas", "--ref", "4f2a91c", "--no-upload"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).not.toContain("2 words")
  expect(answer.refusals[0]).toContain("4f2a91c")
})

test("a commit named with an equals sign is the same as one named after a space", async () => {
  const answer = await deploy(["atlas", "--ref=origin/change-19458"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("origin/change-19458")
})

test("a call naming no commit answers no commit rather than a fixed one", async () => {
  const world = pastTheChecks()
  const seen: Wanted[] = []
  const putting: PuttingUp = async (_read, _slug, _commit, wanted) => {
    seen.push(wanted)
    return await Promise.resolve({ report: [], refusals: [], code: OK })
  }
  await deploy(["one-web", "--dry-run"], given(world.root), putting)
  expect(seen[0]?.ref).toBeNull()
  expect(seen[0]?.dryRun).toBe(true)
})

test("a commit flag with nothing after it is refused rather than read as a flag", async () => {
  const bare = await deploy(["atlas", "--ref"], HERE)
  expect(bare.code).toBe(1)
  expect(bare.refusals[0]).toContain("takes a value, and none follows it")
  const flagged = await deploy(["atlas", "--ref", "--no-upload"], HERE)
  expect(flagged.refusals[0]).toContain("takes a value, and none follows it")
  const empty = await deploy(["atlas", "--ref="], HERE)
  expect(empty.refusals[0]).toContain("names none")
})

test("a commit named as an empty word is refused rather than read as the head", async () => {
  const answer = await deploy(["atlas", "--ref", ""], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names none")
})

test("a commit named twice is refused rather than chosen between", async () => {
  const answer = await deploy(["atlas", "--ref", "one", "--ref", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--ref` is said twice")
})

test("two places to install to are refused rather than chosen between", async () => {
  const answer = await deploy(["atlas", "--simulator", "--device"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("are never said together")
})

const IMAGE = "the image one/web:abc, built and pushed to the registry"

test("a deploy that threw part way names in its refusal what it had put up", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = (_read, _slug, _commit, _wanted, _given, _restarting, up) => {
    up.push(IMAGE)
    up.push(`${world.commit}, pushed to origin main`)
    throw new Error("kubectl apply was killed")
  }
  const answer = await deploy(["one-web"], given(world.root), putting)
  expect(answer.code).toBe(3)
  expect(answer.refusals[0]).toContain("kubectl apply was killed")
  expect(answer.refusals[1]).toContain(IMAGE)
  expect(answer.refusals[1]).toContain(`${world.commit}, pushed to origin main`)
  expect(answer.report).toContain(`up\t${IMAGE}`)
})

test("a deploy refused without a throw names in its refusal what it had put up", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = async (_read, _slug, _commit, _wanted, _given, _restarting, up) => {
    up.push(IMAGE)
    return await Promise.resolve({
      report: [],
      refusals: ["kubectl apply exited 1"],
      code: OPERATIONAL,
    })
  }
  const answer = await deploy(["one-web"], given(world.root), putting)
  expect(answer.refusals[0]).toContain("kubectl apply exited 1")
  expect(answer.refusals[1]).toContain(IMAGE)
})

test("a deploy refused with nothing put up says nothing about what it put up", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = async () =>
    await Promise.resolve({
      report: [],
      refusals: ["the recipe names no repository"],
      code: DATA,
    })
  const answer = await deploy(["one-web"], given(world.root), putting)
  expect(answer.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a deploy that threw before anything reached a machine says that rather than saying it may be partial", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = () => {
    throw new Error("the pinned tree would not open")
  }
  const answer = await deploy(["one-web"], given(world.root), putting)
  expect(answer.code).toBe(3)
  expect(answer.refusals[1]).toContain("nothing it puts up had reached a machine")
  expect(answer.refusals[1]).not.toContain("may be")
})

test("the refusal names each service with no test proving it runs", () => {
  const said = saidOfUnproven(["one.running.test.ts", "two.running.test.ts"])
  expect(said).toContain("one.running.test.ts")
  expect(said).toContain("two.running.test.ts")
  expect(said).toContain("proves it runs")
})

test("what a deploy put up is named in the refusal rather than counted", () => {
  expect(stoppedPartWay(["one", "two"])).toContain("one; two")
  expect(stoppedPartWay([])).not.toContain("what it put up")
})

test("what a deploy put up is said in the sentence every refusal says it in", () => {
  expect(stoppedPartWay(["one", "two"])).toBe(partWay(["one", "two"])[0] as string)
})

test("a deploy that put nothing up says so, which that sentence does not", () => {
  expect(partWay([])).toEqual([])
  expect(stoppedPartWay([])).toContain("nothing it puts up had reached a machine")
})
