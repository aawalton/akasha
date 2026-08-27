import { drive, type drive_v3 } from "@googleapis/drive"
import { makeAuthClient } from "./auth"

export interface DriveClient {
  readonly raw: drive_v3.Drive
}

export async function makeDriveClient(): Promise<DriveClient> {
  const auth = makeAuthClient()
  const raw = drive({ version: "v3", auth })
  return { raw }
}
