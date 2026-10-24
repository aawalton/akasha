;(() => {
  try {
    const root = document.documentElement
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)")
    const apply = () => {
      const chosen = localStorage.getItem("scheme")
      const light = chosen === "light" || (chosen === "system" && prefersLight.matches)
      if (light) root.dataset.scheme = "light"
      else delete root.dataset.scheme
    }
    apply()
    prefersLight.addEventListener("change", apply)
    window.addEventListener("scheme", apply)
    window.addEventListener("storage", (event) => {
      if (event.key === "scheme") apply()
    })
  } catch {}
})()
