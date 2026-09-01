import { z } from "zod"

const rawUserId = globalThis.process?.env.USER_ID

export const USER_ID = z.string().default("9ba554f7-cb18-48bb-a709-ec935a895ca7").parse(rawUserId)
