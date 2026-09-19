import { expect, test } from "bun:test"
import { ci } from "akasha/infrastructure/container-image/dockerfile/built-image/ci/ci.built-image.ts"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { refOf } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import {
  applyArgv,
  carriedAt,
  checkedOut,
  endedBy,
  fateOf,
  imageHeldFor,
  jobRan,
  jobYamlFor,
  logsArgv,
  waitArgv,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import {
  COMMIT,
  capturing,
  carried,
  pushed,
  ranOf,
  refusedPush,
  uncarried,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.test-fixtures.ts"
import { IN_CLUSTER } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"

const NAME = "held-job-0123456789ab"

const YAML = "kind: Job\n"

const WAS = "89abcdef0123456789abcdef0123456789abcdef"

const SCRIPT = "echo held"

function scriptOf(commit: string, was: string | null): string {
  return checkedOut(commit, was).join("\n")
}

test("a job is put up by reading the manifest off standard input", () => {
  expect(applyArgv()).toEqual(["apply", "-f", "-"])
})

test("a job takes the repository from the git service inside the cluster", () => {
  expect(scriptOf(COMMIT, null)).toContain("git-transport.git.svc.cluster.local:3000")
})

test("a job fetches the commit it is made at rather than the whole history", () => {
  expect(scriptOf(COMMIT, null)).toContain(`--depth 1 origin ${COMMIT}`)
  expect(scriptOf(COMMIT, null)).toContain("git checkout -q FETCH_HEAD")
})

test("a job handed no earlier commit fetches one commit", () => {
  expect(scriptOf(COMMIT, null).split("git fetch").length - 1).toBe(1)
  expect(scriptOf(COMMIT, COMMIT).split("git fetch").length - 1).toBe(1)
})

test("a job fetches an earlier commit it is handed beside the commit it is made at", () => {
  const said = scriptOf(COMMIT, WAS)
  expect(said).toContain(`--depth 1 origin ${WAS}`)
  expect(said.indexOf(WAS)).toBeLessThan(said.indexOf(`origin ${COMMIT}`))
})

test("an earlier commit origin no longer carries leaves the rest of the job running", () => {
  expect(scriptOf(COMMIT, WAS)).toContain(`origin ${WAS} || true`)
})

test("a job builds no index, git carrying every index a page is read through", () => {
  expect(scriptOf(COMMIT, null)).not.toContain("index-building")
  expect(scriptOf(COMMIT, null)).not.toContain("index refresh")
})

test("a job runs the script it is handed", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain(SCRIPT)
  expect(jobYamlFor(NAME, SCRIPT)).toContain(NAME)
})

test("a job that failed is not run again by the cluster", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("backoffLimit: 0")
})

test("a job bounds what that job carries", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("activeDeadlineSeconds")
})

test("the key a job decrypts a secret with is handed in from a secret", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("SOPS_AGE_KEY")
  expect(jobYamlFor(NAME, SCRIPT)).not.toContain("AGE-SECRET-KEY")
})

test("the memory a landing starts on is read from the pod", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("LANDING_MIN_FREE_MEMORY_GB")
})

test("a job states that the run it carries is the one in the cluster", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain(IN_CLUSTER)
})

test("a job holds every privilege the node gives a container", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("privileged: true")
})

test("the wait names the job, its namespace and how long it is waited on", () => {
  const said = waitArgv(NAME, "condition=Complete", "30m")
  expect(said).toContain(`job/${NAME}`)
  expect(said).toContain("--timeout=30m")
  expect(said).toContain("workers")
})

test("a job that failed is seen on the round it failed rather than after the whole wait", () => {
  const held = capturing((argv) => ranOf(argv.includes("--for=condition=Failed") ? 0 : 1))
  expect(fateOf(held.running, NAME, 180)).toBe("failed")
  expect(held.seen.length).toBe(2)
})

test("a job still running past every round is answered as running", () => {
  const held = capturing(() => ranOf(1))
  expect(fateOf(held.running, NAME, 3)).toBe("running")
  expect(held.seen.length).toBe(6)
})

test("every line the job said is read rather than the last few", () => {
  expect(logsArgv(NAME)).toContain("--tail=-1")
})

test("a job that ended has its lines carried back", () => {
  expect(endedBy("complete", ranOf(0, "one\ntwo\n"), NAME)).toEqual({ said: ["one", "two"] })
})

test("a job that failed refuses the run, and the lines still come back", () => {
  const held = endedBy("failed", ranOf(0, "why\n"), NAME) as { why: string }
  expect(held.why).toContain(NAME)
  expect(held.why).toContain("why")
})

test("a job left running past the wait refuses the run", () => {
  const held = endedBy("running", ranOf(0), NAME) as { why: string }
  expect(held.why).toContain("had not ended")
})

test("a commit origin carries is carried with no push", () => {
  let pushes = 0
  expect(
    carriedAt(ROOT, COMMIT, carried, (root) => {
      pushes += 1
      return pushed(root)
    })
  ).toBe(null)
  expect(pushes).toBe(0)
})

test("a commit origin does not carry is pushed there, and then carried", () => {
  let asked = 0
  expect(
    carriedAt(
      ROOT,
      COMMIT,
      () => {
        asked += 1
        return { carried: asked > 1 }
      },
      pushed
    )
  ).toBe(null)
  expect(asked).toBe(2)
})

test("a commit origin still does not carry after the push refuses the run", () => {
  const why = carriedAt(ROOT, COMMIT, uncarried, pushed)
  expect(why).toContain(COMMIT)
  expect(why).toContain("no job in the cluster can read it")
})

test("a push that failed refuses the run and says what the push said", () => {
  const why = carriedAt(ROOT, COMMIT, uncarried, refusedPush)
  expect(why).toContain(COMMIT)
  expect(why).toContain("refused")
})

test("a push another writer of that commit won leaves the commit carried", () => {
  let asked = 0
  const carriedAfter = (): { readonly carried: boolean } => {
    asked += 1
    return { carried: asked > 1 }
  }
  expect(carriedAt(ROOT, COMMIT, carriedAfter, refusedPush)).toBe(null)
  expect(asked).toBe(2)
})

test("a commit origin carries is applied and then waited on", async () => {
  const held = capturing()
  const said = await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed)
  expect(said).toEqual({ said: [] })
  expect(held.seen[0]).toEqual(["apply", "-f", "-"])
  expect(held.sent()).toBe(YAML)
})

test("a job the cluster would not take refuses the run by name", async () => {
  const held = capturing((argv) => (argv[0] === "apply" ? ranOf(1, "", "nope") : ranOf(0)))
  const said = (await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed)) as {
    why: string
  }
  expect(said.why).toContain(NAME)
  expect(said.why).toContain("nope")
})

test("a commit that reaches origin nowhere puts no job up", async () => {
  const held = capturing()
  await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, uncarried, pushed)
  expect(held.seen).toEqual([])
})

test("a job names the ci image at the hash of that image's build inputs", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain(refOf(ci))
  expect(refOf(ci)).toMatch(/\/cluster\/ci:[0-9a-f]{12}$/)
})

test("a job names no image by a tag that moves", () => {
  expect(jobYamlFor(NAME, SCRIPT)).not.toContain("cluster/ci:latest")
})

test("a manifest naming no image of this system's reaches no registry", async () => {
  expect(await imageHeldFor(YAML, ROOT)).toBe(null)
})
