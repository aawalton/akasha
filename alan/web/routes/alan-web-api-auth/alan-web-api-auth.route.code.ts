import { handleAuthRequest } from "akasha/alan/harness/better-auth-rr/modules/google-auth-server/google-auth-server.module.code.ts"

export async function loader({ request }: { request: Request }): Promise<Response> {
  return handleAuthRequest(request)
}

export async function action({ request }: { request: Request }): Promise<Response> {
  return handleAuthRequest(request)
}
