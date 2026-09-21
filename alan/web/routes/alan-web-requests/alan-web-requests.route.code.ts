import { redirect } from "react-router"

const REQUESTS = "https://requests.alanwalton.com/"

export function loader(): Response {
  return redirect(REQUESTS, 301)
}
