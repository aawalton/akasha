import { expect, test } from "bun:test"
import {
  NO_USER_IN_ANSWER,
  type SignedInAnswer,
  type SignedInReader,
  signedInUserId,
  userIdFor,
} from "./watcher-signed-in-user.module.code.ts"

function answering(answer: SignedInAnswer, asked: { count: number }): SignedInReader {
  return {
    auth: {
      getUser: async () => {
        asked.count += 1
        return answer
      },
    },
  }
}

const SIGNED_IN: SignedInAnswer = { data: { user: { id: "user-1" } }, error: null }
const SIGNED_OUT: SignedInAnswer = { data: { user: null }, error: { message: "token expired" } }
const NO_USER: SignedInAnswer = { data: { user: null }, error: null }

test("a session naming a user answers that user's id", async () => {
  const asked = { count: 0 }
  expect(await signedInUserId(answering(SIGNED_IN, asked), "do the work")).toBe("user-1")
  expect(asked.count).toBe(1)
})

test("a stated user id is taken without the session being asked", async () => {
  const asked = { count: 0 }
  expect(await userIdFor(answering(SIGNED_OUT, asked), "stated-1", "do the work")).toBe("stated-1")
  expect(asked.count).toBe(0)
})

test("no stated user id sends the question to the session", async () => {
  const asked = { count: 0 }
  expect(await userIdFor(answering(SIGNED_IN, asked), undefined, "do the work")).toBe("user-1")
  expect(asked.count).toBe(1)
})

test("a stated user id of null sends the question to the session", async () => {
  const asked = { count: 0 }
  expect(await userIdFor(answering(SIGNED_IN, asked), null, "do the work")).toBe("user-1")
  expect(asked.count).toBe(1)
})

test("an answer carrying an error is refused with what the session said", async () => {
  const asked = { count: 0 }
  expect(signedInUserId(answering(SIGNED_OUT, asked), "import these sales")).rejects.toThrow(
    "no signed-in user to import these sales (token expired)"
  )
})

test("an answer carrying no user and no error says the user was absent", async () => {
  const asked = { count: 0 }
  expect(signedInUserId(answering(NO_USER, asked), "export the tasks")).rejects.toThrow(
    `no signed-in user to export the tasks (${NO_USER_IN_ANSWER})`
  )
})

test("a refusal names the work rather than the handler that asked", async () => {
  const asked = { count: 0 }
  let said = ""
  try {
    await signedInUserId(answering(SIGNED_OUT, asked), "write these companions")
  } catch (err) {
    said = err instanceof Error ? err.message : String(err)
  }
  expect(said).toContain("write these companions")
  expect(said).not.toContain("runImport")
  expect(said).not.toContain("runExport")
})

test("the legacy refusal for a signed-out session named its own caller and this one names the work", async () => {
  const asked = { count: 0 }
  const legacy = "runImportSales: not authenticated (token expired)"
  let said = ""
  try {
    await signedInUserId(answering(SIGNED_OUT, asked), "import these sales")
  } catch (err) {
    said = err instanceof Error ? err.message : String(err)
  }
  expect(legacy).toContain("runImportSales")
  expect(said).toBe("no signed-in user to import these sales (token expired)")
})

test("the legacy fallback text for an unexplained refusal was no user", async () => {
  const asked = { count: 0 }
  let said = ""
  try {
    await signedInUserId(answering(NO_USER, asked), "import these sales")
  } catch (err) {
    said = err instanceof Error ? err.message : String(err)
  }
  expect(said).toBe("no signed-in user to import these sales (the session carried no user)")
})
