import { z } from "zod"
import { spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"

const imageSchema = z
  .object({
    url: z.string(),
    height: z.number().nullable(),
    width: z.number().nullable(),
  })
  .passthrough()

export const currentUserSchema = z
  .object({
    id: z.string(),
    display_name: z.string().nullable(),
    email: z.string().optional(),
    external_urls: z.object({ spotify: z.string() }).passthrough(),
  })
  .passthrough()

export type CurrentUser = z.infer<typeof currentUserSchema>

export const publicUserSchema = z
  .object({
    id: z.string(),
    display_name: z.string().nullable(),
    external_urls: z.object({ spotify: z.string() }).passthrough(),
    followers: z
      .object({ href: z.string().nullable(), total: z.number() })
      .passthrough()
      .optional(),
    images: z.array(imageSchema).optional(),
    type: z.string().optional(),
    uri: z.string().optional(),
  })
  .passthrough()

export type PublicUser = z.infer<typeof publicUserSchema>

export function getCurrentUser(): Promise<CurrentUser> {
  return spotifyGet("/me", currentUserSchema)
}

export function getUserProfile(userId: string): Promise<PublicUser> {
  return spotifyGet(`/users/${encodeURIComponent(userId)}`, publicUserSchema)
}

async function probePublicProfile(): Promise<PublicUser> {
  const me = await getCurrentUser()
  return getUserProfile(me.id)
}

const descriptor: EndpointDescriptor = {
  name: "users",
  scopes: ["user-read-private", "user-read-email"],
  probes: [
    {
      name: "GET /me",
      run: () => getCurrentUser(),
    },
    {
      name: "GET /users/{user_id}",
      run: () => probePublicProfile(),
    },
  ],
}

export default descriptor
