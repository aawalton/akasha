import { drive, type drive_v3 } from "@googleapis/drive"
import { makeAuthClient } from "../drive-auth/drive-auth.module.code.ts"

export interface DriveClient {
  readonly raw: drive_v3.Drive
}

export async function makeDriveClient(): Promise<DriveClient> {
  const authorised = makeAuthClient()
  const raw = drive({ version: "v3", auth: authorised })
  return { raw }
}
