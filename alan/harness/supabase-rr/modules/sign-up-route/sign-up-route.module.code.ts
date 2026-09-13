import { redirect } from "react-router"

export function signUpLoader(): Response {
  return redirect("/sign-in")
}
